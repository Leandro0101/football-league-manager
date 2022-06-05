import { PartialType } from '@nestjs/swagger';
import { CreateTeamOwnerDto } from './add-team-owner.dto';

export class UpdateTeamOwnerDto extends PartialType(CreateTeamOwnerDto) {}
