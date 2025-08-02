import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
