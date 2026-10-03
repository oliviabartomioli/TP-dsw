import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class professionalDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dniP!: number;

  @IsString()
  @IsNotEmpty()
  nameP!: string;

  @IsString()
  @IsNotEmpty()
  surnameP!: string;

  @IsString()
  @IsNotEmpty()
  typeP!: string;

  @IsString()
  @IsNotEmpty()
  assessmentP!: string;

  @IsBoolean()
  @IsOptional()
  deleteP?: boolean;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idCity!: number;
}
