import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { province } from './entity/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([province])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
