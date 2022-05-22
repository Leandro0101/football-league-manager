import { PartialType } from '@nestjs/swagger';
import { AddTeamOwnerDto } from './add-team-owner.dto';

export class UpdateTeamOwnerDto extends PartialType(AddTeamOwnerDto) {}
