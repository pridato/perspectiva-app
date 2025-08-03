import { Controller, Get, Put, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /**
     * Obtiene el perfil del usuario autenticado
     * @param req - Request con información del usuario autenticado
     * @returns Perfil del usuario
     */
    @Get('profile')
    async getProfile(@Request() req: AuthenticatedRequest) {
        const userId = req.user.userId;
        const user = await this.usersService.findById(userId);
        
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // Retornar usuario sin contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Actualiza el perfil del usuario autenticado
     * @param req - Request con información del usuario autenticado
     * @param updateData - Datos a actualizar
     * @returns Usuario actualizado
     */
    @Put('profile')
    async updateProfile(@Request() req: AuthenticatedRequest, @Body() updateData: { name?: string; email?: string }) {
        const userId = req.user.userId;
        const user = await this.usersService.updateProfile(userId, updateData);
        
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // Retornar usuario sin contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Obtiene un usuario específico (solo para admins)
     * @param req - Request con información del usuario autenticado
     * @param id - ID del usuario a obtener
     * @returns Usuario solicitado
     */
    @Get(':id')
    @Roles('admin')
    async getUserById(@Param('id') id: string) {
        const user = await this.usersService.findById(parseInt(id));
        
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // Retornar usuario sin contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Elimina un usuario (solo para admins)
     * @param req - Request con información del usuario autenticado
     * @param id - ID del usuario a eliminar
     * @returns Mensaje de confirmación
     */
    @Delete(':id')
    @Roles('admin')
    async deleteUser(@Param('id') id: string) {
        const deleted = await this.usersService.deleteUser(parseInt(id));
        
        if (!deleted) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        return { message: 'Usuario eliminado correctamente' };
    }
} 