import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe
} from '@nestjs/common';
import { DilemasService } from './dilemas.service';
import { CreateDilemaDto } from './dto/create-dilema.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DilemaResponseEntity, DilemasListResponseEntity } from './entities/dilema.entity';
import { DILEMA_CONSTANTS, HTTP_CONSTANTS } from '../../consts';

@Controller('dilemas')
@UseGuards(JwtAuthGuard)
export class DilemasController {
  constructor(private readonly dilemasService: DilemasService) {}

  /**
   * Endpoint para crear un nuevo dilema emocional
   * POST /dilemas
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createDilemaDto: CreateDilemaDto,
    @Request() req: any
  ): Promise<DilemaResponseEntity> {
    try {
      const userId = req.user.sub; // ← Cambiar de userId a sub
      
      // Debug: verificar que tenemos el userId
      console.log('User from JWT:', req.user);
      console.log('userId:', userId);

      const dilema = await this.dilemasService.create(userId, createDilemaDto);
      
      return {
        success: HTTP_CONSTANTS.RESPONSES.SUCCESS,
        message: DILEMA_CONSTANTS.MESSAGES.SUCCESS.CREATED,
        data: dilema,
        meta: {
          timestamp: new Date().toISOString(),
          userId,
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error creating dilema:', error);
      console.log('Request user:', req.user);
      
      return {
        success: HTTP_CONSTANTS.RESPONSES.FAILURE,
        message: errorMessage,
        error: DILEMA_CONSTANTS.ERROR_CODES.CREATE_DILEMA_ERROR,
        meta: {
          timestamp: new Date().toISOString(),
          userId: req.user?.sub, // ← Cambiar de userId a sub
        }
      };
    }
  }

  /**
   * Endpoint para obtener los dilemas del usuario autenticado
   * GET /dilemas
   */
  @Get()
  async findMyDilemas(
    @Request() req: any,
    @Query('page', new ParseIntPipe({ optional: true })) page = DILEMA_CONSTANTS.PAGINATION.DEFAULT_PAGE,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = DILEMA_CONSTANTS.PAGINATION.DEFAULT_LIMIT
  ): Promise<DilemasListResponseEntity> {
    try {
      const userId = req.user.sub; // ← Cambiar de userId a sub
      const result = await this.dilemasService.findByUser(userId, page, limit);
      
      return {
        success: HTTP_CONSTANTS.RESPONSES.SUCCESS,
        message: DILEMA_CONSTANTS.MESSAGES.SUCCESS.RETRIEVED,
        data: result.data,
        meta: {
          ...result.meta,
          timestamp: new Date().toISOString(),
          userId,
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        success: HTTP_CONSTANTS.RESPONSES.FAILURE,
        message: errorMessage,
        error: DILEMA_CONSTANTS.ERROR_CODES.GET_DILEMAS_ERROR,
        meta: {
          timestamp: new Date().toISOString(),
          userId: req.user?.sub, // ← Cambiar de userId a sub
          total: 0,
          page,
          limit,
          totalPages: 0,
        }
      };
    }
  }
}
