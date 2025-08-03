import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

/**
 * DTO para el registro de un usuario
 */
export class RegisterDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;
  
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
} 