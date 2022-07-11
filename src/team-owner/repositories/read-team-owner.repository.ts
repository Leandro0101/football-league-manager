import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamOwnerDocument, TeamOwnerPersistence } from '../entities';
import { TeamOwnerApplication } from '../entities/team-owner.application';
import { TeamOwnerRepository } from './team-owner-repository';

@Injectable()
export class ReadTeamOwnerRepository extends TeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwnerPersistence.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {
    super();
  }

  async getByEmail(email: string): Promise<TeamOwnerApplication> {
    const mongoResult = await this.teamOwnerModel.findOne({ email });
    return this.toApplication(mongoResult);
  }

  async getById(id: string): Promise<TeamOwnerApplication> {
    const mongoResult = await this.teamOwnerModel.findOne({ id });
    return this.toApplication(mongoResult);
  }
}
