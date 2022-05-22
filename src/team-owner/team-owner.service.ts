import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTeamOwnerDto } from './dto';
import { UpdateTeamOwnerDto } from './dto/update-team-owner.dto';
import { TeamOwner, TeamOwnerDocument } from './entities/team-owner.schema';

@Injectable()
export class TeamOwnerService {
  constructor(
    @InjectModel(TeamOwner.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}
  async create(createTeamOwnerDto: AddTeamOwnerDto) {
    const teamOwner = await this.teamOwnerModel.create(createTeamOwnerDto);
    return teamOwner;
  }

  findAll() {
    return `This action returns all teamOwner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamOwner`;
  }

  update(id: number, updateTeamOwnerDto: UpdateTeamOwnerDto) {
    return `This action updates a #${id} teamOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamOwner`;
  }
}
