import { ConflictException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/common/services/hashing';
import { CreateTeamOwnerDto } from '../dto';
import { TeamOwnerApplication } from '../entities';
import {
  WriteTeamOwnerRepository,
  ReadTeamOwnerRepository,
} from '../repositories';

@Injectable()
export class AddTeamOwnerService {
  constructor(
    private readonly readTeamOwner: ReadTeamOwnerRepository,
    private readonly writeTeamOwner: WriteTeamOwnerRepository,
    private readonly hashing: HashingService,
  ) {}
  async execute(dto: CreateTeamOwnerDto): Promise<TeamOwnerApplication> {
    const { email } = dto;
    const exists = await this.readTeamOwner.getByEmail(email);
    if (exists) {
      throw new ConflictException(
        'There is already a team owner with this email',
      );
    }

    const application = TeamOwnerApplication.create(dto);
    application.password = await this.hashing.hash(application.password);
    return await this.writeTeamOwner.addTeamOwner(application);
  }
}
