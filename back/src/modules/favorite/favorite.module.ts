import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './entity/favorite.entity';
import { User } from '../users/entity/user.entity';
import { Professional } from '../professional/entity/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Professional])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
