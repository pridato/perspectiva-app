import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO para confirmar reset de contraseña
 */
export class ResetPasswordConfirmDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
} 