import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddTeamOwnerDto } from '../dto';
import { TeamOwnerApplication } from '../entities';
import { AddTeamOwnerRepository } from '../repositories/add-team-owner.repository';
import { CheckTeamOwnerRepository } from '../repositories/check-team-owner.repository';

@ApiTags('team-owner')
@Controller('team-owners')
export class AddTeamOwnerController {
  constructor(
    private readonly checkTeamOwner: CheckTeamOwnerRepository,
    private readonly addTeamOwner: AddTeamOwnerRepository,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 409,
    description: 'There is already a team owner with this email',
    schema: {
      example: {
        id: '628aa6f45469bd3e97e2a961',
        name: 'Team owner name',
        email: 'mail@mail.example',
      },
    },
  })
  async handler(@Body() dto: AddTeamOwnerDto) {
    const { email } = dto;
    const exists = await this.checkTeamOwner.checkByEmail(email);
    if (exists) {
      throw new ConflictException(
        'There is already a team owner with this email',
      );
    }

    const application = TeamOwnerApplication.create(dto);
    const savedApplication = await this.addTeamOwner.addTeamOwner(application);
    return savedApplication.getPresentation();
  }
}
