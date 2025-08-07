import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DilemasModule } from './dilemas/dilemas.module';

@Module({
  imports: [AuthModule, UsersModule, DilemasModule],
})
export class AppModule {}