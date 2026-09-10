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
  @IsNotEmpty()
  idRequest!: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsBoolean()
  @IsOptional()
  deleteRequest?: boolean;
}
