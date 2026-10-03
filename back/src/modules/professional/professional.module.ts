import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { Professional } from './entity/professional.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { city } from '../city/entity/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, city])],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
})
export class ProfessionalModule {}
