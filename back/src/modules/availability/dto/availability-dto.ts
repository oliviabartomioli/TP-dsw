import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMilitaryTime,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class AvailabilityDto {
  @IsEnum(DayOfWeek)
  dayOfWeek!: DayOfWeek;

  @IsMilitaryTime({ message: 'startTime debe tener formato HH:mm' })
  startTime!: string;

  @IsMilitaryTime({ message: 'endTime debe tener formato HH:mm' })
  endTime!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  dniProfessional!: number;

  @IsOptional()
  @IsBoolean()
  deleteAv?: boolean;
}
