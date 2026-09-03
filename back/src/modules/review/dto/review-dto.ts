import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class reviewDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idReview!: number;

  @IsString()
  @IsNotEmpty()
  commentR!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  rating!: number;

  @IsBoolean()
  @IsOptional()
  deleteR?: boolean;
}
