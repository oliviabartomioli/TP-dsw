import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class requestDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idRequest!: number;
}
