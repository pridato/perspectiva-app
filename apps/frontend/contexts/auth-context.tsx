"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string | null;
  emailVerified: boolean;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Verificar si la ruta es pública (no requiere autenticación)
  const isPublicRoute = (path: string) => {
    const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/verify-email', '/'];
    return publicRoutes.includes(path) || path.startsWith('/auth/');
  };

  // Verificar autenticación con el backend
  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      
      if (!storedToken) {
        return false;
      }

      // Validar token con el backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setToken(storedToken);
        return true;
      } else {
        // Token inválido, limpiar datos
        localStorage.removeItem('auth_token');
        setUser(null);
        setToken(null);
        return false;
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('auth_token');
      setUser(null);
      setToken(null);
      return false;
    }
  };

  // Función de login
  const login = (authToken: string, userData: User) => {
    localStorage.setItem('auth_token', authToken);
    setToken(authToken);
    setUser(userData);
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    router.push('/auth/login');
  };

  // Verificar autenticación al cargar y en cambios de ruta
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      const isAuthenticated = await checkAuth();
      
      // Si no está autenticado y no está en una ruta pública, redirigir a login
      if (!isAuthenticated && !isPublicRoute(pathname)) {
        router.push('/auth/login');
      }
      
      // Si está autenticado y está en una ruta de auth, redirigir a la app
      if (isAuthenticated && pathname.startsWith('/auth/')) {
        router.push('/app/dilemas');
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [pathname, router]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
