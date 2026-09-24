import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FavoriteDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  fiveStarAmount!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;

  @IsOptional()
  @IsBoolean()
  deleteFav?: boolean;
}
