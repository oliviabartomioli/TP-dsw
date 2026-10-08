import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class requestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  idRequest?: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsOptional()
  @IsString()
  state?: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dniUs!: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idService!: number;

  @IsBoolean()
  @IsOptional()
  deleteRequest?: boolean;
}
