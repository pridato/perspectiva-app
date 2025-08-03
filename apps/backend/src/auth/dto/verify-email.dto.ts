import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO para la verificación de email
 */
export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty({ message: 'El token de verificación es requerido' })
  token!: string;
} 