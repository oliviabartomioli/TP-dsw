import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Favorite } from './entity/favorite.entity';
import { FavoriteDto } from './dto/favorite-dto';
import { Professional } from '../professional/entity/professional.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
  ) {}

  async createFavorite(favorite: FavoriteDto) {
    const userExists = await this.userRepository.findOne({
      where: {
        dniUs: favorite.dniUs,
        deleteU: false,
      },
    });

    if (!userExists) {
      throw new ConflictException('usuario no existe');
    }

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: favorite.dniP,
        deleteP: false,
      },
    });

    if (!professionalExists) {
      throw new ConflictException('profesional no existe');
    }

    const newFavorite = this.favoriteRepository.create({
      date: favorite.date,
      user: userExists,
      professional: professionalExists,
    });

    return await this.favoriteRepository.save(newFavorite);
  }

  async findFavorite(idfav: number) {
    return await this.favoriteRepository.findOne({
      where: { idfav },
      relations: {
        user: true,
        professional: true,
      },
    });
  }

  async findAll() {
    return await this.favoriteRepository.find({
      where: { deleteFav: false },
      relations: {
        user: true,
        professional: true,
      },
    });
  }

  async findAllDelete() {
    return await this.favoriteRepository.find({
      where: { deleteFav: true },
      relations: {
        user: true,
        professional: true,
      },
    });
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
