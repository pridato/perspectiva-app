import { IsEmail, IsString } from 'class-validator';

/**
 * DTO para el login de un usuario
 */
export class LoginDto {
  @IsEmail()
    email!: string;

  @IsString()
    password!: string;
}