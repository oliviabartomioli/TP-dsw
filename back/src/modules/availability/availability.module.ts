import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { Availability } from './entity/availability.entity';
import { Professional } from '../professional/entity/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Availability, Professional])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
