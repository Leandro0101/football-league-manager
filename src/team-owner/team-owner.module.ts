import { Module } from '@nestjs/common';
import { TeamOwnerService } from './team-owner.service';
import { TeamOwnerController } from './team-owner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TeamOwnerPersistence,
  TeamOwnerSchema,
} from './entities/team-owner.persistence';
import { AddTeamOwnerController } from './controllers/add-team-owner.controller';
import { CheckTeamOwnerRepository } from './repositories/check-team-owner.repository';
import { AddTeamOwnerRepository } from './repositories/add-team-owner.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: TeamOwnerSchema, name: TeamOwnerPersistence.name },
    ]),
  ],
  controllers: [TeamOwnerController, AddTeamOwnerController],
  providers: [
    TeamOwnerService,
    CheckTeamOwnerRepository,
    AddTeamOwnerRepository,
  ],
})
export class TeamOwnerModule {}
