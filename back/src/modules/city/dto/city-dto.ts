import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class cityDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idCity!: number;
}
