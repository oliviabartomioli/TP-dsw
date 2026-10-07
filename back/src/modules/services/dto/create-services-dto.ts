import { IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';

export class CreateServicesDto {
  @IsString()
  @IsNotEmpty()
  nameS!: string;

  @IsString()
  @IsNotEmpty()
  descriptionS!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idCategory!: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dniP!: number;
}