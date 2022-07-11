import { Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';

@Injectable()
export class MailSenderService {
  private SES: SESClient;
  constructor() {
    this.SES = new SESClient({ region: process.env.AWS_DEFAULT_REGION });
  }

  async sendMail(input: Omit<SendEmailCommandInput, 'Source'>): Promise<void> {
    await this.SES.send(
      new SendEmailCommand({ ...input, Source: 'leandrovieira3306@gmail.com' }),
    );
  }
}
