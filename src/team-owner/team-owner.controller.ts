import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamOwnerService } from './team-owner.service';
import { UpdateTeamOwnerDto } from './dto/update-team-owner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team-owner')
@Controller('team-owners')
export class TeamOwnerController {
  constructor(private readonly teamOwnerService: TeamOwnerService) {}

  @Get()
  findAll() {
    return this.teamOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamOwnerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamOwnerDto: UpdateTeamOwnerDto,
  ) {
    return this.teamOwnerService.update(+id, updateTeamOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamOwnerService.remove(+id);
  }
}
