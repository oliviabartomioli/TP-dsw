import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './entity/services.entity';
import { Repository } from 'typeorm';
import { ServicesDto } from './dto/services-dto';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private ServicesRepository: Repository<Services>,
  ) {}
  async createServices(services: ServicesDto) {
    const servicesExists = await this.findServices(services.idService);
    if (servicesExists) {
      throw new ConflictException('el servicio ya existe');
    } else {
      return await this.ServicesRepository.save(services);
    }
  }
  async findServices(idService: number) {
    return await this.ServicesRepository.findOne({ where: { idService } });
  }
  async findAll() {
    return await this.ServicesRepository.find({ where: { deleteS: false } });
  }
  async findAllDelete() {
    return await this.ServicesRepository.find({ where: { deleteS: true } });
  }
  async upDateServices(services: ServicesDto) {
    return await this.ServicesRepository.save(services);
  }
  async deleteServices(idService: number) {
    const servicesExists = await this.findServices(idService);
    if (!servicesExists) {
      throw new ConflictException(
        'el servicio con id:' + idService + 'no existe',
      );
    }
    if (servicesExists.deleteS) {
      throw new ConflictException(
        'el servicio con id' + idService + 'esta eliminado',
      );
    }
    const rows: UpdateResult = await this.ServicesRepository.update(
      { idService },
      { deleteS: true },
    );
    return rows.affected == 1;
  }
  async restoreServices(idService: number) {
    const ServicesExists = await this.findServices(idService);

    if (!ServicesExists) {
      throw new ConflictException(
        'El servicio con idServicio ' + idService + ' no existe',
      );
    }
    if (!ServicesExists) {
      throw new ConflictException('el servicio no esta eliminado');
    }

    const rows: UpdateResult = await this.ServicesRepository.update(
      { idService },
      { deleteS: false },
    );
    return rows.affected == 1;
  }
}
