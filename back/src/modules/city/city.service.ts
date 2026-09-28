import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { city } from './entity/city.entity';
import { cityDto } from './dto/city-dto';
import { province } from '../province/entity/province.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(city) private cityRepository: Repository<city>,

    @InjectRepository(province)
    private readonly provinceRepository: Repository<province>,
  ) {}

  async createCity(cityData: cityDto) {
    const cityExists = await this.findCity(cityData.nameCity);

    if (cityExists) {
      throw new ConflictException('Ciudad ya registrada.');
    }

    const provinceExists = await this.provinceRepository.findOne({
      where: {
        idProvince: cityData.idProvince,
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
  async findAll() {
    return await this.cityRepository.find({ where: { deleteCity: false } });
  }
  async deleteCity(nameCity: string) {
    const cityExists = await this.findCity(nameCity);
    if (!cityExists) {
      throw new ConflictException('La ciudad:' + nameCity + 'no existe');
    }
    if (cityExists.deleteCity) {
      throw new ConflictException('La ciudad:' + nameCity + 'esta eliminada');
    }
  }
  async restoreCity(nameCity: string) {
    const cityExists = await this.findCity(nameCity);
    if (!cityExists) {
      throw new ConflictException('La ciudad:' + nameCity + 'no existe.');
    }
    if (!cityExists.deleteCity) {
      throw new ConflictException('La ciudad no esta eliminada.');
    }
  }
}
