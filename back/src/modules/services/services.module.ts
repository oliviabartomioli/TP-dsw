import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entity/services.entity';
import { category } from '../category/entity/category.entity';
import { Professional } from '../professional/entity/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services, category, Professional])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
