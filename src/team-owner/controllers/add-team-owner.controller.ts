import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailConfirmationProducerService } from 'src/common/services/jobs';
import { CreateTeamOwnerDto } from '../dto';
import { AddTeamOwnerService } from '../services/add-team-owner.service';

@ApiTags('team-owner')
@Controller('team-owners')
export class AddTeamOwnerController {
  constructor(
    private readonly addTeamOwnerService: AddTeamOwnerService,
    private readonly sendEmailConfirmationProducerService: SendEmailConfirmationProducerService,
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
  async handler(@Body() dto: CreateTeamOwnerDto) {
    const teamOwner = await this.addTeamOwnerService.execute(dto);

    await this.sendEmailConfirmationProducerService.sendMail(teamOwner.email, {
      id: teamOwner.id,
    });

    return teamOwner.getPresentation();
  }
}
