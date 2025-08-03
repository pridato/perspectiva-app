import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
/**
 * Servicio para manejar las operaciones de los usuarios
 */
export class UsersService {

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
        
        return prisma.user.create({
            data: {
                name: registerDto.name,
                email: registerDto.email,
                password: hashedPassword,
                role: 'user',
            },
        });
    }
}

