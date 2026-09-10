import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { city } from "./entity/city.entity";
import { cityDto } from "./dto/city-dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(city) private cityRepository: Repository<city>,
  ) {}
  async createCity(city: cityDto) {
    const cityExists = await this.findCity(city.nameCity);
    if (cityExists) {
      throw new ConflictException("Ciudad ya registrada.");
    } else {
      return await this.cityRepository.save(city);
    }
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
      throw new ConflictException("La ciudad:" + nameCity + "no existe");
    }
    if (cityExists.deleteCity) {
      throw new ConflictException("La ciudad:" + nameCity + "esta eliminada");
    }
  }
  async restoreCity(nameCity: string) {
    const cityExists = await this.findCity(nameCity);
    if (!cityExists) {
      throw new ConflictException("La ciudad:" + nameCity + "no existe.");
    }
    if (!cityExists.deleteCity) {
      throw new ConflictException("La ciudad no esta eliminada.");
    }
  }
}
