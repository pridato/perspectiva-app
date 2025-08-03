import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from './email.service';

@Injectable()
/**
 * Servicio para manejar las operaciones de autenticación
 */
export class AuthService {

  /**
   * Constructor del servicio de autenticación
   * @param usersService - Servicio para manejar las operaciones de los usuarios
   * @param jwtService - Servicio para manejar los tokens JWT
   * @param emailService - Servicio para manejar el envío de emails
   */
  constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  /**
   * Registra un nuevo usuario
   * @param registerDto - Los datos del usuario a registrar
   * @returns El usuario registrado sin la contraseña
   */
  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear el nuevo usuario
    const user = await this.usersService.create(registerDto);
    
    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Valida las credenciales de un usuario
   * @param email - El email del usuario
   * @param password - La contraseña del usuario
   * @returns El usuario si las credenciales son válidas, null en caso contrario
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    if(!user.emailVerified) {
      throw new Error('Email no verificado, por favor verifica tu email');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Genera un token JWT para un usuario
   * @param user - El usuario a generar el token
   * @returns El token JWT
   */
  async login(user: any) {
    // generamos el payload del token, es decir, los datos que queremos incluir en el token
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // generamos el token JWT
    return { access_token: this.jwtService.sign(payload) };
  }

  /**
   * Solicita reset de contraseña
   * @param email - Email del usuario
   * @returns Mensaje de confirmación
   */
  async requestResetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return { message: 'Si el email existe, recibirás un enlace de recuperación' };
    }

    const token = this.emailService.generateVerificationToken();
    const expires = this.emailService.generateExpirationDate();

    // Guardar token en la base de datos
    await this.usersService.updateResetPasswordToken(user.id, token, expires);

    // Enviar email
    await this.emailService.sendResetPasswordEmail(email, token);

    return { message: 'Si el email existe, recibirás un enlace de recuperación' };
  }

  /**
   * Confirma reset de contraseña
   * @param token - Token de reset
   * @param password - Nueva contraseña
   * @returns Mensaje de confirmación
   */
  async confirmResetPassword(token: string, password: string) {
    const user = await this.usersService.findByResetPasswordToken(token);
    
    if (!user) {
      throw new Error('Token de reset inválido o expirado');
    }

    // Verificar que el token no haya expirado
    if (user.resetPasswordExpires && new Date() > user.resetPasswordExpires) {
      throw new Error('Token de reset expirado');
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña y limpiar token
    await this.usersService.updatePasswordAndClearResetToken(user.id, hashedPassword);

    return { message: 'Contraseña actualizada correctamente' };
  }
}