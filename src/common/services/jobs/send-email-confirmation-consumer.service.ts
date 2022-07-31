import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
@Processor('send-email-confirmation')
export class SendEmailConfirmationConsumerService {
  private SES: SESClient;
  constructor() {
    this.SES = new SESClient({ region: process.env.AWS_DEFAULT_REGION });
  }

  @Process()
  async execute(input: Job<{ email: string; apiEndPoint: string }>) {
    const { apiEndPoint, email } = input.data;
    await this.SES.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: 'Email confirmation',
          },
          Body: {
            Html: {
              Data: `<a href="${apiEndPoint}"> Confirmar meu email </a>`,
            },
          },
        },
        Source: 'leandrovieira3306@gmail.com',
      }),
    );
  }
}
