import { Controller, Post, Body, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
/**
 * Controlador para manejar las operaciones de autenticación
 */
export class AuthController {

    /**
     * Constructor del controlador de autenticación
     * @param authService - Servicio para manejar las operaciones de autenticación
     */
    constructor(private readonly authService: AuthService) {}

    /**
     * Registra un nuevo usuario
     * @param registerDto - Los datos del usuario a registrar
     * @returns El token JWT del usuario registrado
     */
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        try {
            const user = await this.authService.register(registerDto);
            return this.authService.login(user);
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new ConflictException('El email ya está registrado');
            }
            throw error;
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

        return this.authService.login(user);
    }
}
