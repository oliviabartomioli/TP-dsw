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

  async createServices(servicesData: ServicesDto) {
    const servicesExists = await this.findServices(servicesData.idService);

    if (servicesExists) {
      throw new ConflictException('El servicio ya existe');
    }

    const categoryExists = await this.categoryRepository.findOne({
      where: {
        idCategory: servicesData.idCategory,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: servicesData.dniP,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    const newService = this.ServicesRepository.create({
      nameS: servicesData.nameS,
      descriptionS: servicesData.descriptionS,
      category: categoryExists,
      professional: professionalExists,
    });

    return await this.ServicesRepository.save(newService);
  }

  async findServices(idService: number) {
    return await this.ServicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.professional', 'professional')
      .leftJoinAndSelect('professional.city', 'city')
      .where('service.idService = :idService', { idService })
      .getOne();
  }

  async findAll() {
    return await this.ServicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.professional', 'professional')
      .where('service.deleteS = :deleted', { deleted: false })
      .getMany();
  }

  async findByCategory(idCategory: number) {
    return await this.ServicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.professional', 'professional')
      .leftJoinAndSelect('professional.city', 'city')
      .where('service.deleteS = :deleted', { deleted: false })
      .andWhere('category.idCategory = :idCategory', { idCategory })
      .getMany();
  }

  async findByCity(idCity: number) {
    return await this.ServicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.professional', 'professional')
      .leftJoinAndSelect('professional.city', 'city')
      .where('service.deleteS = :deleted', { deleted: false })
      .andWhere('city.idCity = :idCity', { idCity })
      .getMany();
  }

  async findAllDelete() {
    return await this.ServicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.professional', 'professional')
      .where('service.deleteS = :deleted', { deleted: true })
      .getMany();
  }

  async upDateServices(servicesData: ServicesDto) {
    const servicesExists = await this.findServices(servicesData.idService);

    if (!servicesExists) {
      throw new ConflictException(
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
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: servicesData.dniP,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    servicesExists.nameS = servicesData.nameS;
    servicesExists.descriptionS = servicesData.descriptionS;
    servicesExists.category = categoryExists;
    servicesExists.professional = professionalExists;

    return await this.ServicesRepository.save(servicesExists);
  }

  async deleteServices(idService: number) {
    const servicesExists = await this.findServices(idService);

    if (!servicesExists) {
      throw new ConflictException(
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
      throw new ConflictException(
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
