import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailService } from '../auth/email.service';

@Module({
  providers: [UsersService, EmailService],
  exports: [UsersService]
})
export class UsersModule {}
