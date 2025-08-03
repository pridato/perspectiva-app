import { IsEmail, IsString, Matches } from 'class-validator';

/**
 * DTO para el login de un usuario
 */
export class LoginDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El email debe tener un formato válido (ejemplo: usuario@dominio.com)'
  })
  email!: string;

  @IsString()
    password!: string;
}