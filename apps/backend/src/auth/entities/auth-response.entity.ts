/**
 * Entity que representa la respuesta de autenticación
 */
export class AuthResponse {
  user!: {
    id: number;
    email: string;
    name?: string | null;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
  };
  token!: {
    access_token: string;
  };
} 