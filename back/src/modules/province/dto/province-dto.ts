import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class provinceDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idProvince!: number;

  @IsString()
  @IsNotEmpty()
  nameProvince!: string;

  @IsBoolean()
  @IsOptional()
  deleteProvince?: boolean;
}
