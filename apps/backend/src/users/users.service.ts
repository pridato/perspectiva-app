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
              console.log("Email de verificación enviado")
          } catch (error) {
            console.error('Error al enviar el email de verificación:', error);
            throw new Error('Error al enviar el email de verificación');
          }
          
        
          return user;
    }

    /**
     * Crea un perfil para un usuario con valores iniciales en 0
     * @param userId - ID del usuario
     * @returns El perfil creado
     */
    async createProfile(userId: number) {
        return await prisma.perfil.create({
            data: {
                userId,
                bienestar: 0,
                autoconocimiento: 0,
                gestionEmocional: 0,
                dilemasTotales: 0,
                creenciasTransformadas: 0,
                diasActivo: 0,
                progresoEmocional: 0,
            },
        });
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
                    gt: new Date(), // La fecha de expiración debe ser mayor que ahora
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

    /**
     * Busca un usuario por su ID
     * @param id - ID del usuario
     * @returns El usuario encontrado o null si no se encuentra
     */
    async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    /**
     * Actualiza el perfil de un usuario
     * @param userId - ID del usuario
     * @param updateData - Datos a actualizar
     * @returns El usuario actualizado
     */
    async updateProfile(userId: number, updateData: { name?: string; email?: string }) {
        return prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
    }

    /**
     * Elimina un usuario
     * @param userId - ID del usuario a eliminar
     * @returns true si se eliminó correctamente, false si no se encontró
     */
    async deleteUser(userId: number): Promise<boolean> {
        try {
            await prisma.user.delete({
                where: { id: userId },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Actualiza el token de reset de contraseña
     * @param userId - ID del usuario
     * @param token - Token de reset
     * @param expires - Fecha de expiración
     * @returns El usuario actualizado
     */
    async updateResetPasswordToken(userId: number, token: string, expires: Date) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                resetPasswordToken: token,
                resetPasswordExpires: expires,
            },
        });
    }

    /**
     * Busca un usuario por su token de reset de contraseña
     * @param token - Token de reset
     * @returns El usuario encontrado o null si no se encuentra
     */
    async findByResetPasswordToken(token: string) {
        return prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date(), // La fecha de expiración debe ser mayor que ahora
                },
            },
        });
    }

    /**
     * Actualiza la contraseña y limpia el token de reset
     * @param userId - ID del usuario
     * @param hashedPassword - Contraseña hasheada
     * @returns El usuario actualizado
     */
    async updatePasswordAndClearResetToken(userId: number, hashedPassword: string) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
    }
}

