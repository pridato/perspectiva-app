import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
/**
 * Servicio para manejar las operaciones de autenticación
 */
export class AuthService {

  /**
   * Constructor del servicio de autenticación
   * @param usersService - Servicio para manejar las operaciones de los usuarios
   * @param jwtService - Servicio para manejar los tokens JWT
   */
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService ) {}

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
    // const isMatch = password === user.password; // TODO: cambiar a bcrypt
    if (!isMatch) return null;

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
}