import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UsersDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dniUs!: number;

  @IsString()
  @IsNotEmpty()
  nameU!: string;

  @IsString()
  @IsNotEmpty()
  surnameU!: string;

  @IsString()
  @IsNotEmpty()
  phoneU!: string;

  @IsEmail()
  @IsNotEmpty()
  emailU!: string;

  @IsString()
  @IsNotEmpty()
  passwordU!: string;

  @IsOptional()
  @IsBoolean()
  deleteU?: boolean;
}
