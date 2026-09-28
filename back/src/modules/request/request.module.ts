import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { request } from './entity/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([request])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
