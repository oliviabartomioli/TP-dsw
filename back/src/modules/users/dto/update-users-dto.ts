import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UsersDto } from './users-dto';

export class UpdateUsersDto extends OmitType(UsersDto, ['passwordU'] as const) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  passwordU?: string;
}
