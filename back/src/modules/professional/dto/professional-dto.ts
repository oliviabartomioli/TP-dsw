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
  name!: string;

  @IsString()
  @IsNotEmpty()
  surname!: string;

  @IsString()
  @IsNotEmpty()
  typeP!: string;

  @IsString()
  @IsNotEmpty()
  assessment!: string;

  @IsBoolean()
  @IsOptional()
  delete?: boolean;
}
