import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { request } from './entity/request.entity';
import { User } from '../users/entity/user.entity';
import { Services } from '../services/entity/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([request, User, Services])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
