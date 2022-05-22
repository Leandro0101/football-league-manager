import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamOwner, TeamOwnerDocument } from '../entities/team-owner.schema';

@Injectable()
export class CheckTeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwner.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}

  async checkByEmail(email: string): Promise<boolean> {
    const entity = await this.teamOwnerModel.findOne({ email }, '_id');
    return !!entity;
  }
}
