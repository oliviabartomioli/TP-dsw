import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class cityDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idCity!: number;

  @IsString()
  @IsNotEmpty()
  nameCity!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idProvince!: number;

  @IsBoolean()
  @IsOptional()
  deleteCity?: boolean;
}
