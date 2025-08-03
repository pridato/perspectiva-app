import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../auth/email.service';

const prisma = new PrismaClient();

@Injectable()
/**
 * Servicio para manejar las operaciones de los usuarios
 */
export class UsersService {

    constructor(private readonly emailService: EmailService) {}

    /**
     * Busca un usuario por su email
     * @param email - El email del usuario a buscar
     * @returns El usuario encontrado o null si no se encuentra
     */
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    /**
     * Crea un nuevo usuario
     * @param registerDto - Los datos del usuario a crear
     * @returns El usuario creado
     */
    async create(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const verificationToken = this.emailService.generateVerificationToken();
        const expirationDate = this.emailService.generateExpirationDate();
  
        // Crear el usuario con token y fecha de expiración de token de verificación de email
        const user = await prisma.user.create({
            data: {
              name: registerDto.name,
              email: registerDto.email,
              password: hashedPassword,
              role: 'user',
              emailVerificationToken: verificationToken,
              emailVerificationExpires: expirationDate,
            },
          });

          try {
            await this.emailService.sendVerificationEmail(
                user.email, 
                verificationToken
              );
          } catch (error) {
            console.error('Error al enviar el email de verificación:', error);
            throw new Error('Error al enviar el email de verificación');
          }
          
        
          return user;
    }

    /**
     * Verifica el email de un usuario
     * @param token - Token de verificación
     * @returns El usuario verificado o null si el token es inválido
     */
    async verifyEmail(token: string) {
        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return null;
        }

        // Actualizar usuario como verificado
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
        });

        // Enviar email de bienvenida
        await this.emailService.sendWelcomeEmail(
            updatedUser.email, 
            updatedUser.name || undefined
        );

        return updatedUser;
    }
}

