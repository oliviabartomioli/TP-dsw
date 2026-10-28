import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Services } from './entity/services.entity';
import { ServicesDto } from './dto/services-dto';
import { category } from '../category/entity/category.entity';
import { Professional } from '../professional/entity/professional.entity';
import { CreateServicesDto } from './dto/create-services-dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private ServicesRepository: Repository<Services>,

    @InjectRepository(category)
    private categoryRepository: Repository<category>,

    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
  ) {}

  async createServices(servicesData: CreateServicesDto) {
    const categoryExists = await this.categoryRepository.findOne({
      where: {
        idCategory: servicesData.idCategory,
        deleteC: false,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: servicesData.dniP,
        deleteP: false,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    const newService = this.ServicesRepository.create({
      nameS: servicesData.nameS,
      descriptionS: servicesData.descriptionS,
      priceS: servicesData.priceS,
      category: categoryExists,
      professional: professionalExists,
    });

    return await this.ServicesRepository.save(newService);
  }

  async findServices(idService: number) {
    return await this.ServicesRepository.findOne({
      where: { idService },
      relations: {
        category: true,
        professional: {
          city: true,
        },
      },
    });
  }

  async findAll() {
    return await this.ServicesRepository.find({
      where: { deleteS: false },
      relations: {
        category: true,
        professional: true,
      },
    });
  }

  async findByCategory(idCategory: number) {
    return await this.ServicesRepository.find({
      where: {
        deleteS: false,
        category: {
          idCategory,
        },
      },
      relations: {
        category: true,
        professional: {
          city: true,
        },
      },
    });
  }

  async findByCity(idCity: number) {
    return await this.ServicesRepository.find({
      where: {
        deleteS: false,
        professional: {
          city: {
            idCity,
          },
        },
      },
      relations: {
        category: true,
        professional: {
          city: true,
        },
      },
    });
  }

  async findAllDelete() {
    return await this.ServicesRepository.find({
      where: { deleteS: true },
      relations: {
        category: true,
        professional: true,
      },
    });
  }

  async upDateServices(servicesData: ServicesDto) {
    const servicesExists = await this.findServices(servicesData.idService);

    if (!servicesExists) {
      throw new NotFoundException(
        'El servicio con ID ' + servicesData.idService + ' no existe',
      );
    }

    if (servicesExists.deleteS) {
      throw new ConflictException(
        'El servicio con ID ' + servicesData.idService + ' está eliminado',
      );
    }

    const categoryExists = await this.categoryRepository.findOne({
      where: {
        idCategory: servicesData.idCategory,
        deleteC: false,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: servicesData.dniP,
        deleteP: false,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    servicesExists.nameS = servicesData.nameS;
    servicesExists.descriptionS = servicesData.descriptionS;
    servicesExists.priceS = servicesData.priceS;
    servicesExists.category = categoryExists;
    servicesExists.professional = professionalExists;

    return await this.ServicesRepository.save(servicesExists);
  }

  async deleteServices(idService: number) {
    const servicesExists = await this.findServices(idService);

    if (!servicesExists) {
      throw new NotFoundException(
        'El servicio con ID ' + idService + ' no existe',
      );
    }

    if (servicesExists.deleteS) {
      throw new ConflictException(
        'El servicio con ID ' + idService + ' está eliminado',
      );
    }

    const rows: UpdateResult = await this.ServicesRepository.update(
      { idService },
      { deleteS: true },
    );

    return rows.affected == 1;
  }

  async restoreServices(idService: number) {
    const servicesExists = await this.findServices(idService);

    if (!servicesExists) {
      throw new NotFoundException(
        'El servicio con ID ' + idService + ' no existe',
      );
    }

    if (!servicesExists.deleteS) {
      throw new ConflictException('El servicio no está eliminado');
    }

    const rows: UpdateResult = await this.ServicesRepository.update(
      { idService },
      { deleteS: false },
    );

    return rows.affected == 1;
  }
}
