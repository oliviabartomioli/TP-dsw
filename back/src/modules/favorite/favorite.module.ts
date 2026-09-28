import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entity/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoriteService],
})
export class FavoriteModule {}
