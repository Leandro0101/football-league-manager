import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailSenderService } from '../mail/mail-sender.service';

@Injectable()
export class SendEmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailSenderService: MailSenderService,
  ) {}

  async execute<T = { id: string }>(email: string, data: T): Promise<void> {
    const payload = {
      ...data,
      expiresIn: process.env.JWT_EMAIL_CONFIRMATION_EXPIRES,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EMAIL_CONFIRMATION_EXPIRES,
      secret: process.env.JWT_EMAIL_CONFIRMATION_SECRET,
    });

    await this.mailSenderService.sendMail({
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
            Data: `<a href="http://localhost:3000/api/v1/team-owners/confirm-email/${token}"> Confirmar meu email </a>`,
          },
        },
      },
    });
  }
}
