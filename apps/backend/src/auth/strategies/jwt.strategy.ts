import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../entities/token-payload.entity';

@Injectable()
/**
 * Estrategia para manejar la autenticación JWT
 */
export class JwtStrategy extends PassportStrategy(Strategy) {

  /**
   * Constructor de la estrategia JWT
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret', // Usa la clave secreta del .env
    });
  }

  /**
   * Valida el payload del token JWT
   * @param payload - El payload del token JWT
   * @returns El usuario autenticado
   */
  async validate(payload: TokenPayload) {
    // Cambiar userId por sub para mantener consistencia con JWT estándar
    return {
      sub: payload.sub,        // ← Cambio aquí
      email: payload.email,
      role: payload.role,
    };
  }
}
