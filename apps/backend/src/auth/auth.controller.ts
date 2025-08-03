import { Controller, Post, Body, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
/**
 * Controlador para manejar las operaciones de autenticación
 */
export class AuthController {

    /**
     * Constructor del controlador de autenticación
     * @param authService - Servicio para manejar las operaciones de autenticación
     * @param usersService - Servicio para manejar las operaciones de usuarios
     */
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    /**
     * Registra un nuevo usuario
     * @param registerDto - Los datos del usuario a registrar
     * @returns El objeto del usuario y el token JWT
     */
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        try {
            const user = await this.authService.register(registerDto);

            return this.formatUserResponse(user);
        } catch (error: any) {
            throw new ConflictException(error.message);
        }
    }

    /**
     * Inicia sesión de un usuario
     * @param loginDto - Los datos del usuario a iniciar sesión
     * @returns El token JWT
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            if (!user) throw new Error('Credenciales inválidas');
            
            return this.formatUserResponse(user);
        } catch (error: any) {
            throw new UnauthorizedException(error.message);
        }
    }

    /**
     * Verifica el email de un usuario
     * @param verifyEmailDto - Los datos de verificación
     * @returns Mensaje de confirmación
     */
    @Post('verify-email')
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        const user = await this.usersService.verifyEmail(verifyEmailDto.token);
        
        if (!user) {
            throw new BadRequestException('Token de verificación inválido o expirado');
        }

        return {
            message: 'Email verificado exitosamente',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                emailVerified: true,
            }
        };
    }

    /**
     * Solicita reset de contraseña
     * @param resetPasswordDto - Los datos para reset de contraseña
     * @returns Mensaje de confirmación
     */
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        try {
            return await this.authService.requestResetPassword(resetPasswordDto.email);
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Confirma reset de contraseña
     * @param resetPasswordConfirmDto - Los datos para confirmar reset de contraseña
     * @returns Mensaje de confirmación
     */
    @Post('reset-password/confirm')
    async resetPasswordConfirm(@Body() resetPasswordConfirmDto: ResetPasswordConfirmDto) {
        try {
            return await this.authService.confirmResetPassword(
                resetPasswordConfirmDto.token,
                resetPasswordConfirmDto.password
            );
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * Formatea la respuesta del usuario
     * @param user - El usuario a formatear
     * @returns El usuario formateado y el token JWT
     */
    private async formatUserResponse(user: { id: number; email: string; name: string | null; emailVerified: boolean; emailVerificationToken: string | null; emailVerificationExpires: Date | null; role: string; createdAt: Date; }) {
        const token = await this.authService.login(user);
        const { id, emailVerificationExpires, emailVerificationToken, ...userFormatted } = user;

        return {
            user: userFormatted,
            token: token
        };
    }
}
