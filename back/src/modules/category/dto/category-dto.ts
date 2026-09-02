import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class categoryDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idCategory!: number;

  @IsString()
  @IsNotEmpty()
  nameC!: string;

  @IsString()
  @IsNotEmpty()
  descriptionC!: string;

  @IsBoolean()
  @IsOptional()
  deleteC?: boolean;
}
