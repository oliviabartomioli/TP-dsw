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

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  private validateTimes(availability: AvailabilityDto) {
    if (availability.startTime >= availability.endTime) {
      throw new BadRequestException('startTime debe ser menor que endTime');
    }
  }

  async createAvailability(availability: AvailabilityDto) {
    this.validateTimes(availability);
    return await this.availabilityRepository.save(availability);
  }

  // incluye las dadas de baja (lo usa el delete)
  async findAvailability(idAvailability: number) {
    return await this.availabilityRepository.findOne({
      where: { idAvailability },
    });
  }

  // solo activas, para el GET por id
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
    await this.findOneAvailability(idAvailability); // tira 404 si no existe o está dada de baja
    return await this.availabilityRepository.save({
      ...availability,
      idAvailability,
    });
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
