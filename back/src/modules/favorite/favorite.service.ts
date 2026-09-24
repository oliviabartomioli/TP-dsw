import { ConflictException, Injectable } from '@nestjs/common';
import { Favorite } from './entity/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteDto } from './dto/favorite-dto';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async createFavorite(favorite: FavoriteDto) {
    return await this.favoriteRepository.save(favorite);
  }

  async findFavorite(idfav: number) {
    return await this.favoriteRepository.findOne({ where: { idfav } });
  }

  async findAll() {
    return await this.favoriteRepository.find({ where: { deleteFav: false } });
  }

  async findAllDelete() {
    return await this.favoriteRepository.find({ where: { deleteFav: true } });
  }

  async deleteFavorite(idfav: number) {
    const favoriteExists = await this.findFavorite(idfav);
    if (!favoriteExists) {
      throw new ConflictException('favorito no existe');
    }
    if (favoriteExists.deleteFav) {
      throw new ConflictException('favorito esta eliminado');
    }
    const rows: UpdateResult = await this.favoriteRepository.update(
      { idfav },
      { deleteFav: true },
    );
    return rows.affected == 1;
  }

  async restoreFavorite(idfav: number) {
    const favoriteExists = await this.findFavorite(idfav);
    if (!favoriteExists) {
      throw new ConflictException('favorito no existe');
    }
    if (!favoriteExists.deleteFav) {
      throw new ConflictException('favorito no esta eliminado');
    }
    const rows: UpdateResult = await this.favoriteRepository.update(
      { idfav },
      { deleteFav: false },
    );
    return rows.affected == 1;
  }
}
