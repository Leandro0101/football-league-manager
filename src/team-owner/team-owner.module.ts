import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamOwnerPersistence, TeamOwnerSchema } from './entities';
import {
  AddTeamOwnerController,
  ConfirmTeamOwnerEmailController,
} from './controllers';
import {
  ReadTeamOwnerRepository,
  WriteTeamOwnerRepository,
} from './repositories';
import { AddTeamOwnerService, ConfirmTeamOwnerEmailService } from './services';
import { HashingService } from 'src/common/services/hashing';
import { JwtService } from '@nestjs/jwt';

const services = [AddTeamOwnerService, HashingService, JwtService];

const repositories = [ReadTeamOwnerRepository, WriteTeamOwnerRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: TeamOwnerSchema, name: TeamOwnerPersistence.name },
    ]),
  ],
  controllers: [AddTeamOwnerController, ConfirmTeamOwnerEmailController],
  providers: [...services, ...repositories, ConfirmTeamOwnerEmailService],
})
export class TeamOwnerModule {}
