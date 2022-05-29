import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoHelper } from 'src/shared/mongo-helper';
import { TeamOwnerOutput } from '../dto/team-owner-output.dto';
import { TeamOwnerApplication } from '../entities';
import {
  TeamOwner,
  TeamOwnerDocument,
} from '../entities/team-owner.persistence';
@Injectable()
export class AddTeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwner.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}

  async addTeamOwner(
    teamOwner: TeamOwnerApplication,
  ): Promise<TeamOwnerOutput> {
    const entity = await this.teamOwnerModel.create(teamOwner.getDTO());
    const response = MongoHelper.map(entity, 'TeamOwner');
    return response;
  }
}
