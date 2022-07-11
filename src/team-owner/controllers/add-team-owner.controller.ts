import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailConfirmationService } from 'src/common/services';
import { CreateTeamOwnerDto } from '../dto';
import { AddTeamOwnerService } from '../services/add-team-owner.service';

@ApiTags('team-owner')
@Controller('team-owners')
export class AddTeamOwnerController {
  constructor(
    private readonly addTeamOwnerService: AddTeamOwnerService,
    private readonly emailConfirmationService: SendEmailConfirmationService,
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
    const application = await this.addTeamOwnerService.execute(dto);
    await this.emailConfirmationService.execute(application.email, {
      id: application.id,
    });
    return application.getPresentation();
  }
}
