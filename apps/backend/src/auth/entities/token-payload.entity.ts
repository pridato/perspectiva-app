/**
 * Entity que representa el payload del token JWT
 */
export class TokenPayload {
  sub!: number;      // userId
  email!: string;
  role!: string;
  iat?: number;      // issued at
  exp?: number;      // expiration
} 