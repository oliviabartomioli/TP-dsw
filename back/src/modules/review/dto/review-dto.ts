import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class reviewDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idReview!: number;

  @IsString()
  @IsNotEmpty()
  commentR!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsBoolean()
  @IsOptional()
  deleteR?: boolean;
}
