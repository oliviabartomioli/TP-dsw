import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
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
}
