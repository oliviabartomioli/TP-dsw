import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class reviewDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  commentR!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsInt()
  @IsPositive()
  idRequest!: number;

  @IsBoolean()
  @IsOptional()
  deleteR?: boolean;
}
