import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { city } from './entity/city.entity';
import { cityDto } from './dto/city-dto';
import { province } from '../province/entity/province.entity';
import { CreateCityDto } from './dto/create-city-dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(city)
    private cityRepository: Repository<city>,

    @InjectRepository(province)
    private readonly provinceRepository: Repository<province>,
  ) {}

  async createCity(cityData: CreateCityDto) {
    const cityExists = await this.findCity(cityData.nameCity);

    if (cityExists) {
      throw new ConflictException('Ciudad ya registrada.');
    }

    const provinceExists = await this.provinceRepository.findOne({
      where: {
        idProvince: cityData.idProvince,
        deleteProvince: false,
      },
    });

    if (!provinceExists) {
      throw new NotFoundException('Provincia no encontrada.');
    }

    const newCity = this.cityRepository.create({
      nameCity: cityData.nameCity,
      province: provinceExists,
    });

    return await this.cityRepository.save(newCity);
  }

  async findCity(nameCity: string) {
    return await this.cityRepository.findOne({
      where: { nameCity },
    });
  }

  async findCityById(idCity: number) {
    return await this.cityRepository.findOne({
      where: { idCity },
    });
  }

  async findAll() {
    const cities = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.province', 'province')
      .where('city.deleteCity = :deleted', { deleted: false })
      .getMany();

    return cities;
  }

  async findAllDeleted() {
    return await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.province', 'province')
      .where('city.deleteCity = :deleted', { deleted: true })
      .getMany();
  }

  async updateCity(cityData: cityDto) {
    const cityExists = await this.findCityById(cityData.idCity);

    if (!cityExists) {
      throw new ConflictException(
        'La ciudad con ID ' + cityData.idCity + ' no existe.',
      );
    }

    if (cityExists.deleteCity) {
      throw new ConflictException(
        'La ciudad con ID ' + cityData.idCity + ' está eliminada.',
      );
    }

    const provinceExists = await this.provinceRepository.findOne({
      where: {
        idProvince: cityData.idProvince,
        deleteProvince: false,
      },
    });

    if (!provinceExists) {
      throw new NotFoundException('Provincia no encontrada.');
    }

    cityExists.nameCity = cityData.nameCity;
    cityExists.province = provinceExists;

    return await this.cityRepository.save(cityExists);
  }

  async deleteCity(nameCity: string) {
    const cityExists = await this.findCity(nameCity);

    if (!cityExists) {
      throw new ConflictException('La ciudad: ' + nameCity + ' no existe.');
    }

    if (cityExists.deleteCity) {
      throw new ConflictException(
        'La ciudad: ' + nameCity + ' está eliminada.',
      );
    }

    const rows: UpdateResult = await this.cityRepository.update(
      { nameCity },
      { deleteCity: true },
    );

    return rows.affected == 1;
  }

  async restoreCity(nameCity: string) {
    const cityExists = await this.findCity(nameCity);

    if (!cityExists) {
      throw new ConflictException('La ciudad: ' + nameCity + ' no existe.');
    }

    if (!cityExists.deleteCity) {
      throw new ConflictException('La ciudad no está eliminada.');
    }

    const rows: UpdateResult = await this.cityRepository.update(
      { nameCity },
      { deleteCity: false },
    );

    return rows.affected == 1;
  }
}
