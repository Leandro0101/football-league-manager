import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';

@Injectable()
export class SendEmailConfirmationProducerService {
  constructor(
    @InjectQueue('send-email-confirmation')
    private readonly sendEmailConfirmationQueue: Queue,
    private readonly jwtService: JwtService,
  ) {}

  async sendMail<T = { id: string }>(email: string, data: T) {
    const payload = {
      ...data,
      expiresIn: process.env.JWT_EMAIL_CONFIRMATION_EXPIRES,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EMAIL_CONFIRMATION_EXPIRES,
      secret: process.env.JWT_EMAIL_CONFIRMATION_SECRET,
    });

    const apiEndPoint = `http://localhost:3000/api/v1/team-owners/confirm-email/${token}`;
    await this.sendEmailConfirmationQueue.add({ email, apiEndPoint });
  }
}
