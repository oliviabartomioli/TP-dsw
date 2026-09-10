import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
