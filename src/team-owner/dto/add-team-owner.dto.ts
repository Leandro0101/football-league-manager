import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateTeamOwnerDto {
  @ApiProperty({ example: 'Leandro Lima' })
  @IsNotEmpty()
  @Length(7, 25)
  name: string;

  @ApiProperty({ example: 'anymail.example@docexample' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1657372542' })
  @MinLength(8)
  password: string;
}
