import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export interface EmailData {
  text: string;
  email: string;
  membershipType: string;
}

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {
    this.emailQueue.on('completed', (job) => {
      this.logger.verbose(`Job completed with result: ${job.returnvalue}`);
    });

    this.emailQueue.on('failed', (_job, err) => {
      this.logger.error(`Job failed with error: ${err.message}`);
    });

    this.emailQueue.on('stalled', (job) => {
      this.logger.log(`Job stalled: ${job.id}`);
    });
  }

  async addEmailJob(emailPayload: EmailData) {
    await this.emailQueue.add('sendEmail', emailPayload);
  }
}
