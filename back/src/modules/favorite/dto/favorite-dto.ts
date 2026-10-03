import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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
  dniUs!: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dniP!: number;

  @IsOptional()
  @IsBoolean()
  deleteFav?: boolean;
}
