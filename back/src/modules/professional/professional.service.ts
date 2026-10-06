import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Professional } from './entity/professional.entity';
import { professionalDto } from './dto/professional-dto';
import { city } from '../city/entity/city.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,

    @InjectRepository(city)
    private cityRepository: Repository<city>,
  ) {}

  async createProfessional(professionalData: professionalDto) {
    const professionalExists = await this.findProfessional(
      professionalData.dniP,
    );

    if (professionalExists) {
      throw new ConflictException('profesional ya registrado');
    }

    const cityExists = await this.cityRepository.findOne({
      where: {
        idCity: professionalData.idCity,
        deleteCity: false,
      },
    });

    if (!cityExists) {
      throw new ConflictException('ciudad no existe');
    }

    const newProfessional = this.professionalRepository.create({
      dniP: professionalData.dniP,
      nameP: professionalData.nameP,
      surnameP: professionalData.surnameP,
      typeP: professionalData.typeP,
      assessmentP: professionalData.assessmentP,
      city: cityExists,
    });

    return await this.professionalRepository.save(newProfessional);
  }

  async findProfessional(dniP: number) {
    return await this.professionalRepository.findOne({
      where: { dniP },
      relations: {
        city: {
          province: true,
        },
      },
    });
  }

  async findAll() {
    return await this.professionalRepository.find({
      where: { deleteP: false },
      relations: {
        city: {
          province: true,
        },
      },
    });
  }

  async findAllDelete() {
    return await this.professionalRepository.find({
      where: { deleteP: true },
      relations: {
        city: {
          province: true,
        },
      },
    });
  }

  async upDateProfessional(professionalData: professionalDto) {
    const professionalExists = await this.findProfessional(
      professionalData.dniP,
    );

    if (!professionalExists) {
      throw new ConflictException('profesional no existe');
    }

    if (professionalExists.deleteP) {
      throw new ConflictException('profesional esta eliminado');
    }

    const cityExists = await this.cityRepository.findOne({
      where: {
        idCity: professionalData.idCity,
        deleteCity: false,
      },
    });

    if (!cityExists) {
      throw new ConflictException('ciudad no existe');
    }

    professionalExists.nameP = professionalData.nameP;
    professionalExists.surnameP = professionalData.surnameP;
    professionalExists.typeP = professionalData.typeP;
    professionalExists.assessmentP = professionalData.assessmentP;
    professionalExists.city = cityExists;

    return await this.professionalRepository.save(professionalExists);
  }

  async deleteProfessional(dniP: number) {
    const professionalExists = await this.findProfessional(dniP);

    if (!professionalExists) {
      throw new ConflictException('profesional no existe');
    }

    if (professionalExists.deleteP) {
      throw new ConflictException('profesional esta eliminado');
    }

    const rows: UpdateResult = await this.professionalRepository.update(
      { dniP },
      { deleteP: true },
    );

    return rows.affected == 1;
  }

  async restoreProfessional(dniP: number) {
    const professionalExists = await this.findProfessional(dniP);

    if (!professionalExists) {
      throw new ConflictException('profesional no existe');
    }

    if (!professionalExists.deleteP) {
      throw new ConflictException('profesional no esta eliminado');
    }

    const rows: UpdateResult = await this.professionalRepository.update(
      { dniP },
      { deleteP: false },
    );

    return rows.affected == 1;
  }
}
