import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * Guard para proteger rutas usando autenticación JWT
 * Este guard verifica que el token JWT sea válido antes de permitir acceso a las rutas
 */
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Constructor del guard JWT
   */
  constructor() {
    super();
  }
}
