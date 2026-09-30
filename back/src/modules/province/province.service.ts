import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
    }

    return await this.provinceRepository.save(province);
  }

  async findProvince(nameProvince: string) {
    return await this.provinceRepository.findOne({
      where: { nameProvince },
    });
  }

  async findProvinceById(idProvince: number) {
    return await this.provinceRepository.findOne({
      where: { idProvince },
    });
  }

  async findAll() {
    return await this.provinceRepository.find({
      where: { deleteProvince: false },
    });
  }

  async findAllDeleted() {
    return await this.provinceRepository.find({
      where: { deleteProvince: true },
    });
  }

  async updateProvince(province: provinceDto) {
    const provinceExists = await this.findProvinceById(province.idProvince);

    if (!provinceExists) {
      throw new ConflictException(
        'La provincia con ID ' + province.idProvince + ' no existe.',
      );
    }

    if (provinceExists.deleteProvince) {
      throw new ConflictException(
        'La provincia con ID ' + province.idProvince + ' está eliminada.',
      );
    }

    return await this.provinceRepository.save(province);
  }

  async deleteProvince(nameProvince: string) {
    const provinceExists = await this.findProvince(nameProvince);

    if (!provinceExists) {
      throw new ConflictException(
        'La provincia: ' + nameProvince + ' no existe.',
      );
    }

    if (provinceExists.deleteProvince) {
      throw new ConflictException(
        'La provincia: ' + nameProvince + ' está eliminada.',
      );
    }

    const rows: UpdateResult = await this.provinceRepository.update(
      { nameProvince },
      { deleteProvince: true },
    );

    return rows.affected == 1;
  }

  async restoreProvince(nameProvince: string) {
    const provinceExists = await this.findProvince(nameProvince);

    if (!provinceExists) {
      throw new ConflictException(
        'La provincia: ' + nameProvince + ' no existe.',
      );
    }

    if (!provinceExists.deleteProvince) {
      throw new ConflictException('La provincia no está eliminada.');
    }

    const rows: UpdateResult = await this.provinceRepository.update(
      { nameProvince },
      { deleteProvince: false },
    );

    return rows.affected == 1;
  }
}
