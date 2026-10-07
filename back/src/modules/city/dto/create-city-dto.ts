import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  nameCity!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idProvince!: number;
}
