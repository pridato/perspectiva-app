import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

/**
 * DTO para el registro de un usuario
 */
export class RegisterDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;
  
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El email debe tener un formato válido (ejemplo: usuario@dominio.com)'
  })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'
  })
  password!: string;
} 