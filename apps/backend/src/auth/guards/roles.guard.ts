import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
/**
 * Guard para verificar roles de usuario
 */
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permitir acceso
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
    }

    return hasRole;
  }
} 