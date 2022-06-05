import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamOwnerDto } from './dto';
import { UpdateTeamOwnerDto } from './dto/update-team-owner.dto';
import { TeamOwnerDocument, TeamOwnerPersistence } from './entities';

@Injectable()
export class TeamOwnerService {
  constructor(
    @InjectModel(TeamOwnerPersistence.name)
    private readonly teamOwnerModel: Model<TeamOwnerDocument>,
  ) {}
  async create(createTeamOwnerDto: CreateTeamOwnerDto) {
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
