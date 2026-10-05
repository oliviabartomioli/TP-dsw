import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './entity/availability.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AvailabilityDto } from './dto/availability-dto';
import { Professional } from '../professional/entity/professional.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
  ) {}

  private validateTimes(availability: AvailabilityDto) {
    if (availability.startTime >= availability.endTime) {
      throw new BadRequestException('startTime debe ser menor que endTime');
    }
  }

  async createAvailability(availability: AvailabilityDto) {
    this.validateTimes(availability);

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: availability.dniProfessional,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    const newAvailability = this.availabilityRepository.create({
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
      professional: professionalExists,
    });

    return await this.availabilityRepository.save(newAvailability);
  }

  async findAvailability(idAvailability: number) {
    return await this.availabilityRepository.findOne({
      where: { idAvailability },
    });
  }

  async findOneAvailability(idAvailability: number) {
    const availability = await this.availabilityRepository.findOne({
      where: { idAvailability, deleteAv: false },
    });
    if (!availability) {
      throw new NotFoundException(
        'la disponibilidad con idAvailability: ' +
          idAvailability +
          ' no existe',
      );
    }
    return availability;
  }

  async findAll() {
    return await this.availabilityRepository.find({
      where: { deleteAv: false },
    });
  }

  async upDateAvailability(
    idAvailability: number,
    availability: AvailabilityDto,
  ) {
    this.validateTimes(availability);

    await this.findOneAvailability(idAvailability);

    const professionalExists = await this.professionalRepository.findOne({
      where: {
        dniP: availability.dniProfessional,
      },
    });

    if (!professionalExists) {
      throw new NotFoundException('Profesional no encontrado');
    }

    const availabilityUpdated = this.availabilityRepository.create({
      idAvailability,
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
      professional: professionalExists,
    });

    return await this.availabilityRepository.save(availabilityUpdated);
  }

  async deleteAvailability(idAvailability: number) {
    const availabilityExists = await this.findAvailability(idAvailability);
    if (!availabilityExists) {
      throw new NotFoundException(
        'la disponibilidad con idAvailability: ' +
          idAvailability +
          ' no existe',
      );
    }
    if (availabilityExists.deleteAv) {
      throw new ConflictException(
        'la disponibilidad con idAvailability: ' +
          idAvailability +
          ' ya esta eliminada',
      );
    }
    const rows: UpdateResult = await this.availabilityRepository.update(
      { idAvailability },
      { deleteAv: true },
    );
    return rows.affected === 1;
  }
}
