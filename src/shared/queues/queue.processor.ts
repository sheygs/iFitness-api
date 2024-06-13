import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { EmailService } from '../emails/email.service';
import { EmailData } from './queue.service';

@Injectable()
@Processor('emailQueue')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('sendEmail')
  async handleEmailJob(job: Job) {
    const { text, email, membershipType } = job.data as EmailData;

    this.logger.verbose(
      `emailData: ${JSON.stringify({ text, email, membershipType })}`,
    );

    try {
      const response = await this.emailService.sendMail(
        email,
        `Fitness+ Membership Reminder - ${membershipType}`,
        text,
      );

      this.logger.log(JSON.stringify(response));

      // handle error case
    } catch (error) {
      this.logger.error(`failed to send email to: ${email}`, error);
      // re-throw error to trigger retry attempts
      throw error;
    }
  }
}
