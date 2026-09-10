import { ConflictException, Injectable } from '@nestjs/common';
import { Professional } from './entity/professional.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { professionalDto } from './dto/professional-dto';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
  ) {}
  async createProfessional(professional: professionalDto) {
    const professionalExists = await this.findProfessional(professional.dniP);
    if (professionalExists) {
      throw new ConflictException('profesional ya registrado');
    } else {
      return await this.professionalRepository.save(professional);
    }
  }

  async findProfessional(dniP: number) {
    return await this.professionalRepository.findOne({ where: { dniP } });
  }

  async findAll() {
    return await this.professionalRepository.find({
      where: { deleteP: false },
    });
  }

  async findAllDelete() {
    return await this.professionalRepository.find({
      where: { deleteP: true },
    });
  }

  async upDateProfessional(profesional: professionalDto) {
    return await this.professionalRepository.save(profesional);
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
      {
        dniP,
      },
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
      {
        dniP,
      },
      { deleteP: false },
    );
    return rows.affected == 1;
  }
}
