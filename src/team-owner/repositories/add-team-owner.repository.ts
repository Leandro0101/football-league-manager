import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoHelper } from 'src/shared/mongo-helper';
import { AddTeamOwnerDto } from '../dto';
import { TeamOwnerOutput } from '../dto/team-owner-output.dto';
import { TeamOwner, TeamOwnerDocument } from '../entities/team-owner.schema';
@Injectable()
export class AddTeamOwnerRepository {
  constructor(
    @InjectModel(TeamOwner.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}

  async addTeamOwner(dto: AddTeamOwnerDto): Promise<TeamOwnerOutput> {
    const entity = await this.teamOwnerModel.create(dto);
    const response = MongoHelper.map(entity, 'TeamOwner');
    return response;
  }
}
