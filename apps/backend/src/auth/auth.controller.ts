import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.requestResetPassword(resetPasswordDto.email);
  }

  @Post('reset-password/confirm')
  async confirmResetPassword(@Body() resetPasswordConfirmDto: ResetPasswordConfirmDto) {
    return this.authService.confirmResetPassword(
      resetPasswordConfirmDto.token,
      resetPasswordConfirmDto.password
    );
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    // Implementar verificación de email
    return { message: 'Email verificado exitosamente' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    try {
      const userId = req.user.sub;
      
      // Obtener datos del usuario desde la base de datos
      const user = await this.authService.getUserById(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          role: user.role,
          createdAt: user.createdAt,
        }
      };
    } catch (error) {
      let errorMessage = 'Error al obtener perfil del usuario';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}   