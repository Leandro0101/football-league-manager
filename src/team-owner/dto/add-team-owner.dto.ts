import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateTeamOwnerDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(7, 25)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
