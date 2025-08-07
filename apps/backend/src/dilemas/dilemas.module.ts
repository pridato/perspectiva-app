import { Module } from '@nestjs/common';
import { DilemasController } from './dilemas.controller';
import { DilemasService } from './dilemas.service';

@Module({
  controllers: [DilemasController],
  providers: [DilemasService],
  exports: [DilemasService], // Para usar en otros módulos
})
export class DilemasModule {}
