import { Controller, Param, HttpCode, Get } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfirmTeamOwnerEmailService } from '../services/confirm-team-owner-email.service';

@ApiTags('team-owner')
@Controller('team-owners/confirm-email')
export class ConfirmTeamOwnerEmailController {
  constructor(
    private readonly confirmTeamOwnerEmailService: ConfirmTeamOwnerEmailService,
  ) {}

  @ApiParam({
    name: 'token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2I5ZDQ4NGEwYWNjY2E5YWVjZmIwNCIsImV4cGlyZXNJbiI6IjYwcyIsImlhdCI6MTY1NzUxMTI0MCwiZXhwIjoxNjU3NTExMzAwfQ.3DVLofUJYoWgf2NwMM-kB6owL9ZdvnoEwOiEv5E_gGk',
  })
  @Get(':token')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully confirmed.',
  })
  @ApiResponse({
    status: 403,
    description: 'E-mail already confirmed',
  })
  @ApiResponse({
    status: 404,
    description: "Team owner doesn't exist",
  })
  async handler(@Param() params: { token: string }) {
    const { token } = params;
    await this.confirmTeamOwnerEmailService.execute(token);
  }
}
