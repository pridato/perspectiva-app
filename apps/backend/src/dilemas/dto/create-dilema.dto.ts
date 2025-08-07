import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray, IsEnum, IsInt, Min, Max } from 'class-validator';
import { TipoEmocion } from '@prisma/client';
import { DILEMA_CONSTANTS } from '../../../consts';

export class CreateDilemaDto {
  @IsString({ message: 'El título debe ser un texto válido' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(DILEMA_CONSTANTS.VALIDATION.TITULO.MIN_LENGTH, { 
    message: `El título debe tener al menos ${DILEMA_CONSTANTS.VALIDATION.TITULO.MIN_LENGTH} caracteres` 
  })
  @MaxLength(DILEMA_CONSTANTS.VALIDATION.TITULO.MAX_LENGTH, { 
    message: `El título no puede exceder ${DILEMA_CONSTANTS.VALIDATION.TITULO.MAX_LENGTH} caracteres` 
  })
  titulo!: string;

  @IsString({ message: 'El contenido debe ser un texto válido' })
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  @MinLength(DILEMA_CONSTANTS.VALIDATION.CONTENIDO.MIN_LENGTH, { 
    message: `El contenido debe tener al menos ${DILEMA_CONSTANTS.VALIDATION.CONTENIDO.MIN_LENGTH} caracteres` 
  })
  @MaxLength(DILEMA_CONSTANTS.VALIDATION.CONTENIDO.MAX_LENGTH, { 
    message: `El contenido no puede exceder ${DILEMA_CONSTANTS.VALIDATION.CONTENIDO.MAX_LENGTH} caracteres` 
  })
  contenido!: string;

  @IsOptional()
  @IsArray({ message: 'Las emociones deben ser un array válido' })
  @IsEnum(TipoEmocion, { 
    each: true, 
    message: 'Cada emoción debe ser un tipo válido' 
  })
  emociones?: TipoEmocion[];

  @IsOptional()
  @IsArray({ message: 'Las intensidades deben ser un array de números' })
  @IsInt({ each: true, message: 'Cada intensidad debe ser un número entero' })
  @Min(DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MIN, { 
    each: true, 
    message: `La intensidad mínima es ${DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MIN}` 
  })
  @Max(DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MAX, { 
    each: true, 
    message: `La intensidad máxima es ${DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MAX}` 
  })
  intensidades?: number[];
}
