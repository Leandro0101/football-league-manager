import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ReadTeamOwnerRepository,
  WriteTeamOwnerRepository,
} from '../repositories';

@Injectable()
export class ConfirmTeamOwnerEmailService {
  constructor(
    private readonly readTeamOwner: ReadTeamOwnerRepository,
    private readonly writeTeamOwner: WriteTeamOwnerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string) {
    const teamOwnerId = await this.validateTokenAndGetPayload(token);
    const teamOwner = await this.readTeamOwner.getById(teamOwnerId);
    if (!teamOwner) throw new NotFoundException("Team owner doesn't exist");
    if (teamOwner.emailVerified)
      throw new ForbiddenException('E-mail already confirmed');

    await this.writeTeamOwner.confirmEmail(teamOwnerId);
  }

  private async validateTokenAndGetPayload(token: string) {
    try {
      const { id: teamOwnerId } = await this.jwtService.verify(token, {
        secret: process.env.JWT_EMAIL_CONFIRMATION_SECRET,
      });

      return teamOwnerId;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
