import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para definir roles requeridos en un endpoint
 * @param roles - Array de roles permitidos
 * @returns Metadata con los roles requeridos
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles); 