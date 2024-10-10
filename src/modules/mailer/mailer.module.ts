import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mailer.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailModule {}
