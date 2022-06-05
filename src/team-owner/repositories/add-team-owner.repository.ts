import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoHelper } from 'src/common/mongo-helper';
import { TeamOwnerApplication } from '../entities';
import {
  TeamOwnerPersistence,
  TeamOwnerDocument,
} from '../entities/team-owner.persistence';

@Injectable()
export class AddTeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwnerPersistence.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}

  async addTeamOwner(
    teamOwner: TeamOwnerApplication,
  ): Promise<TeamOwnerApplication> {
    const dbResponse = await this.teamOwnerModel.create(teamOwner.getDTO());
    const mappedData = MongoHelper.map(dbResponse);
    const teamOwnerApplication = new TeamOwnerApplication(mappedData);
    return teamOwnerApplication;
  }
}
