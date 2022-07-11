import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamOwnerApplication } from '../entities';
import {
  TeamOwnerPersistence,
  TeamOwnerDocument,
} from '../entities/team-owner.persistence';
import { TeamOwnerRepository } from './team-owner-repository';

@Injectable()
export class WriteTeamOwnerRepository extends TeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwnerPersistence.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {
    super();
  }

  async addTeamOwner(
    teamOwner: TeamOwnerApplication,
  ): Promise<TeamOwnerApplication> {
    const mongoResult = await this.teamOwnerModel.create(teamOwner.getDTO());
    return this.toApplication(mongoResult);
  }

  async confirmEmail(id: string) {
    await this.teamOwnerModel.updateOne({ id }, { emailVerified: true });
  }
}
