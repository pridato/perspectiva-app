"use client"

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Rutas que NO requieren autenticación
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/verify-email', '/'];
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/auth/');

  useEffect(() => {
    if (!isLoading) {
      // Si no está autenticado y intenta acceder a ruta protegida
      if (!isAuthenticated && !isPublicRoute) {
        router.push('/auth/login');
        return;
      }
      
      // Si está autenticado y está en ruta de auth, redirigir a app
      if (isAuthenticated && pathname.startsWith('/auth/')) {
        router.push('/app/dilemas');
        return;
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, pathname, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado y está en ruta protegida, no mostrar contenido
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  // Si está autenticado y está en ruta de auth, no mostrar contenido (se redirigirá)
  if (isAuthenticated && pathname.startsWith('/auth/')) {
    return null;
  }

  return <>{children}</>;
}
