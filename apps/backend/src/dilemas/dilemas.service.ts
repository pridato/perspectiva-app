import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaClient, TipoEmocion } from '@prisma/client';
import { CreateDilemaDto } from './dto/create-dilema.dto';
import { DilemaEntity } from './entities/dilema.entity';
import { DILEMA_CONSTANTS, EMOTION_DETECTION_PATTERNS } from '../../consts';

@Injectable()
export class DilemasService {
  private prisma = new PrismaClient();

  /**
   * Crea un nuevo dilema emocional para un usuario autenticado
   * @param userId - ID del usuario autenticado
   * @param createDilemaDto - Datos del dilema a crear
   * @returns El dilema creado con sus relaciones
   */
  async create(userId: number, createDilemaDto: CreateDilemaDto): Promise<DilemaEntity> {
    try {
      // Validar que el usuario existe y está activo
      const user = await this.validateUserExists(userId);

      // Validar coherencia entre emociones e intensidades
      this.validateEmotionsAndIntensities(createDilemaDto);

      // Sanitizar el contenido
      const contenidoSanitizado = this.sanitizeContent(createDilemaDto.contenido);
      const tituloSanitizado = this.sanitizeContent(createDilemaDto.titulo);

      // Crear el dilema con transaction para garantizar consistencia
      const dilema = await this.prisma.$transaction(async (prisma) => {
        // Crear el dilema
        const newDilema = await prisma.dilema.create({
          data: {
            userId,
            titulo: tituloSanitizado,
            contenido: contenidoSanitizado,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        });

        // Crear las emociones asociadas si se proporcionaron
        await this.createEmotionsForDilema(newDilema.id, createDilemaDto, prisma);

        // Actualizar estadísticas del perfil del usuario
        await this.updateUserProfile(userId, user.perfil, prisma);

        return newDilema;
      });

      // Retornar el dilema completo con sus relaciones
      const dilemaCompleto = await this.findOneWithDetails(dilema.id);
      if (!dilemaCompleto) {
        throw new BadRequestException('Error al recuperar el dilema creado');
      }
      return dilemaCompleto;

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ForbiddenException) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new BadRequestException(`${DILEMA_CONSTANTS.MESSAGES.ERROR.CREATE_FAILED}: ${errorMessage}`);
    }
  }

  /**
   * Valida que el usuario exista y esté activo
   * @param userId - ID del usuario
   * @returns El usuario si existe y está activo
   */
  private async validateUserExists(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { perfil: true }
    });

    if (!user) {
      throw new ForbiddenException(DILEMA_CONSTANTS.MESSAGES.ERROR.USER_NOT_FOUND);
    }

    if (!user.emailVerified) {
      throw new ForbiddenException(DILEMA_CONSTANTS.MESSAGES.ERROR.EMAIL_NOT_VERIFIED);
    }
    return user;
  }

  /**
   * Busca un dilema con todos sus detalles
   * @param id - ID del dilema
   * @returns El dilema con todas sus relaciones
   */
  async findOneWithDetails(id: number): Promise<DilemaEntity | null> {
    return await this.prisma.dilema.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        emociones: true,
        respuestas: true,
        raices: true,
      }
    });
  }

  /**
   * Obtiene todos los dilemas de un usuario
   * @param userId - ID del usuario
   * @param page - Página (opcional)
   * @param limit - Límite por página (opcional)
   * @returns Lista paginada de dilemas del usuario
   */
  async findByUser(userId: number, page = DILEMA_CONSTANTS.PAGINATION.DEFAULT_PAGE, limit = DILEMA_CONSTANTS.PAGINATION.DEFAULT_LIMIT) {
    // Validar límites de paginación
    const validatedLimit = Math.min(limit, DILEMA_CONSTANTS.PAGINATION.MAX_LIMIT);
    const skip = (page - 1) * validatedLimit;

    const [dilemas, total] = await Promise.all([
      this.prisma.dilema.findMany({
        where: { userId },
        include: {
          emociones: true,
          respuestas: true,
          _count: {
            select: {
              respuestas: true,
              emociones: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: validatedLimit,
      }),
      this.prisma.dilema.count({ where: { userId } })
    ]);

    return {
      data: dilemas,
      meta: {
        total,
        page,
        limit: validatedLimit,
        totalPages: Math.ceil(total / validatedLimit),
      }
    };
  }

  /**
   * Valida la coherencia entre emociones e intensidades
   * @param createDilemaDto - DTO con los datos del dilema
   */
  private validateEmotionsAndIntensities(createDilemaDto: CreateDilemaDto): void {
    if (createDilemaDto.emociones && createDilemaDto.intensidades) {
      if (createDilemaDto.emociones.length !== createDilemaDto.intensidades.length) {
        throw new BadRequestException(DILEMA_CONSTANTS.MESSAGES.ERROR.EMOTION_INTENSITY_MISMATCH);
      }

      // Validar que las intensidades estén en el rango correcto
      for (const intensidad of createDilemaDto.intensidades) {
        if (intensidad < DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MIN || 
            intensidad > DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.MAX) {
          throw new BadRequestException(DILEMA_CONSTANTS.MESSAGES.ERROR.INVALID_INTENSITY_RANGE);
        }
      }
    }
  }

  /**
   * Crea las emociones asociadas al dilema
   * @param dilemaId - ID del dilema
   * @param createDilemaDto - DTO con los datos del dilema
   * @param prisma - Instancia de Prisma para la transacción
   */
  private async createEmotionsForDilema(dilemaId: number, createDilemaDto: CreateDilemaDto, prisma: any): Promise<void> {
    if (createDilemaDto.emociones && createDilemaDto.emociones.length > 0) {
      const emocionesData = createDilemaDto.emociones.map((tipo, index) => ({
        dilemaId,
        tipo,
        intensidad: createDilemaDto.intensidades?.[index] || DILEMA_CONSTANTS.VALIDATION.INTENSIDAD.DEFAULT,
      }));

      await prisma.emocion.createMany({
        data: emocionesData,
      });
    }
  }

  /**
   * Actualiza el perfil del usuario con las estadísticas del nuevo dilema
   * @param userId - ID del usuario
   * @param existingProfile - Perfil existente del usuario
   * @param prisma - Instancia de Prisma para la transacción
   */
  private async updateUserProfile(userId: number, existingProfile: any, prisma: any): Promise<void> {
    // El perfil siempre debe existir ya que se crea automáticamente al registrarse
    if (existingProfile) {
      await prisma.perfil.update({
        where: { userId },
        data: {
          dilemasTotales: { increment: 1 },
          diasActivo: { increment: 1 },
        }
      });
    } else {
      // Esto no debería ocurrir, pero por seguridad creamos el perfil
      console.warn(`Perfil no encontrado para usuario ${userId}, creando uno nuevo`);
      await prisma.perfil.create({
        data: {
          userId,
          bienestar: 0,
          autoconocimiento: 0,
          gestionEmocional: 0,
          dilemasTotales: 1,
          creenciasTransformadas: 0,
          diasActivo: 1,
          progresoEmocional: 0,
        }
      });
    }
  }

  /**
   * Sanitiza el contenido para prevenir inyecciones y contenido malicioso
   * @param content - Contenido a sanitizar
   * @returns Contenido sanitizado
   */
  private sanitizeContent(content: string): string {
    // Remover scripts y tags peligrosos
    const sanitized = content
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();

    return sanitized;
  }

  /**
   * Detecta emociones básicas en el texto usando palabras clave
   * @param text - Texto a analizar
   * @returns Array de emociones detectadas
   */
  private detectEmotionsFromText(text: string): TipoEmocion[] {
    const textLower = text.toLowerCase();
    const emociones: TipoEmocion[] = [];

    for (const [emocion, keywords] of Object.entries(EMOTION_DETECTION_PATTERNS)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        emociones.push(emocion as TipoEmocion);
      }
    }

    return emociones;
  }
}
