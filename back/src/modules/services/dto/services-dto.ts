import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ServicesDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idService!: number;

  @IsString()
  @IsNotEmpty()
  nameS!: string;

  @IsString()
  @IsNotEmpty()
  descriptionS!: string;

  @IsBoolean()
  @IsOptional()
  deleteS?: boolean;
}
