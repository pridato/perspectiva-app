import { TipoEmocion } from '@prisma/client';

export class DilemaEntity {
  id!: number;
  userId!: number;
  titulo!: string;
  contenido!: string;
  createdAt!: Date;
  
  // Relaciones
  user?: {
    id: number;
    name: string | null;
    email: string;
  };
  
  emociones?: EmocionEntity[];
  respuestas?: any[];
  raices?: any[];
}

export class EmocionEntity {
  id!: number;
  dilemaId!: number;
  tipo!: TipoEmocion;
  intensidad!: number;
  createdAt!: Date;
}

export class DilemaResponseEntity {
  success!: boolean;
  message!: string;
  data?: DilemaEntity;
  meta?: {
    timestamp: string;
    userId: number;
  };
  error?: string;
}

export class DilemasListResponseEntity {
  success!: boolean;
  message!: string;
  data?: DilemaEntity[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    timestamp: string;
    userId: number;
  };
  error?: string;
}
