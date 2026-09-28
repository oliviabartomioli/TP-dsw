import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { city } from './entity/city.entity';
import { province } from '../province/entity/province.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([city, province])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
