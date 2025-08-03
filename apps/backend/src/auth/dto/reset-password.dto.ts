import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO para solicitar reset de contraseña
 */
export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
} 