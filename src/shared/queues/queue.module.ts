import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { EmailService } from '../emails/email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [QueueService, QueueProcessor, EmailService],
  exports: [QueueService],
})
export class QueueModule {}
