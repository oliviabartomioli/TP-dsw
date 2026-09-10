import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { province } from './entity/province.entity';
import { provinceDto } from './dto/province-dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(province)
    private provinceRepository: Repository<province>,
  ) {}
  async createProvince(province: provinceDto) {
    const provinceExists = await this.findProvince(province.nameProvince);
    if (provinceExists) {
      throw new ConflictException('Provincia ya registrada.');
    } else {
      return await this.provinceRepository.save(province);
    }
  }
  async findProvince(nameProvince: string) {
    return await this.provinceRepository.findOne({ where: { nameProvince } });
  }
  async findAll() {
    return await this.provinceRepository.find({
      where: { deleteProvince: false },
    });
  }
  async restoreProvince(nameProvince: string) {
    const provinceExists = await this.findProvince(nameProvince);
    if (!provinceExists) {
      throw new ConflictException(
        'La provincia:' + nameProvince + 'no existe.',
      );
    }
    if (!provinceExists.deleteProvince) {
      throw new ConflictException('La provincia no esta eliminada.');
    }
  }
  async deleteProvince(nameProvince: string) {
    const provinceExists = await this.findProvince(nameProvince);
    if (!provinceExists) {
      throw new ConflictException(
        'La provincia:' + nameProvince + 'no existe.',
      );
    }
    if (provinceExists.deleteProvince) {
      throw new ConflictException(
        'La provincia:' + nameProvince + 'esta eliminada.',
      );
    }
  }
}
