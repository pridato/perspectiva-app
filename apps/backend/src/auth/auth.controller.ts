import { Controller, Post, Body, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
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
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return this.formatUserResponse(user);
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
     * Formatea la respuesta del usuario
     * @param user - El usuario a formatear
     * @returns El usuario formateado y el token JWT
     */
    private formatUserResponse(user: { id: number; email: string; name: string | null; emailVerified: boolean; emailVerificationToken: string | null; emailVerificationExpires: Date | null; role: string; createdAt: Date; }) {
        const { id, emailVerificationExpires, emailVerificationToken, ...userFormatted } = user;

        return {
            user: userFormatted,
            token: this.authService.login(user)
        };
    }
}
