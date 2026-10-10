import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { requestDto } from './dto/request-dto';
import { request } from './entity/request.entity';
import { User } from '../users/entity/user.entity';
import { Services } from '../services/entity/services.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(request)
    private requestRepository: Repository<request>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  async createRequests(requests: requestDto) {
    const user = await this.userRepository.findOne({
      where: {
        dniUs: requests.dniUs,
        deleteU: false,
      },
    });

    if (!user) {
      throw new ConflictException(
        'El usuario con DNI ' + requests.dniUs + ' no existe',
      );
    }

    const service = await this.servicesRepository.findOne({
      where: {
        idService: requests.idService,
        deleteS: false,
      },
      relations: {
        professional: true,
      },
    });

    if (!service) {
      throw new ConflictException(
        'El servicio con ID ' + requests.idService + ' no existe',
      );
    }

    if (!service.professional || service.professional.deleteP) {
      throw new ConflictException(
        'El profesional asociado al servicio no está disponible',
      );
    }

    const newRequest = this.requestRepository.create({
      date: requests.date,
      state: 'pendiente',
      user: user,
      service: service,
    });

    return await this.requestRepository.save(newRequest);
  }

  async findRequest(idRequest: number) {
    return await this.requestRepository.findOne({
      where: { idRequest },
    });
  }

  async findAll() {
    return await this.requestRepository.find({
      where: { deleteRequest: false },
      relations: {
        user: true,
        service: {
          professional: true,
        },
      },
    });
  }

  async findAllDelete() {
    return await this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.service', 'service')
      .leftJoinAndSelect('service.professional', 'professional')
      .where('request.deleteRequest = :deleted', { deleted: true })
      .getMany();
  }

  async deleteRequests(idRequest: number) {
    const requestsExists = await this.findRequest(idRequest);

    if (!requestsExists) {
      throw new ConflictException(
        'La solicitud con id: ' + idRequest + ' no existe',
      );
    }

    if (requestsExists.deleteRequest) {
      throw new ConflictException(
        'La solicitud con id ' + idRequest + ' esta eliminada',
      );
    }

    const rows: UpdateResult = await this.requestRepository.update(
      { idRequest },
      { deleteRequest: true },
    );

    return rows.affected == 1;
  }

  async restoreRequest(idRequest: number) {
    const requestExists = await this.findRequest(idRequest);

    if (!requestExists) {
      throw new ConflictException(
        'La solicitud con idRequest ' + idRequest + ' no existe',
      );
    }

    if (!requestExists.deleteRequest) {
      throw new ConflictException('La solicitud no esta eliminada');
    }

    const rows: UpdateResult = await this.requestRepository.update(
      { idRequest },
      { deleteRequest: false },
    );

    return rows.affected == 1;
  }

  async updateRequests(requests: requestDto) {
    if (requests.idRequest === undefined) {
      throw new BadRequestException(
        'El ID de la solicitud es obligatorio para actualizar',
      );
    }
    const requestExists = await this.findRequest(requests.idRequest);

    if (!requestExists) {
      throw new ConflictException(
        'La solicitud con id: ' + requests.idRequest + ' no existe',
      );
    }

    if (requestExists.deleteRequest) {
      throw new ConflictException(
        'La solicitud con id ' + requests.idRequest + ' esta eliminada',
      );
    }

    const userExists = await this.userRepository.findOne({
      where: {
        dniUs: requests.dniUs,
        deleteU: false,
      },
    });

    if (!userExists) {
      throw new ConflictException(
        'El usuario con DNI ' + requests.dniUs + ' no existe',
      );
    }

    const serviceExists = await this.servicesRepository.findOne({
      where: {
        idService: requests.idService,
        deleteS: false,
      },
      relations: {
        professional: true,
      },
    });

    if (!serviceExists) {
      throw new ConflictException(
        'El servicio con ID ' + requests.idService + ' no existe',
      );
    }

    if (!serviceExists.professional || serviceExists.professional.deleteP) {
      throw new ConflictException(
        'El profesional asociado al servicio no está disponible',
      );
    }

    requestExists.date = requests.date;
    requestExists.user = userExists;
    requestExists.service = serviceExists;

    return await this.requestRepository.save(requestExists);
  }

  async changeRequestState(idRequest: number, state: string) {
    const validStates = ['pendiente', 'aceptada', 'rechazada', 'completada'];

    if (!validStates.includes(state)) {
      throw new BadRequestException('Estado de solicitud no válido');
    }

    const requestExists = await this.findRequest(idRequest);

    if (!requestExists) {
      throw new ConflictException(
        'La solicitud con ID ' + idRequest + ' no existe',
      );
    }

    if (requestExists.deleteRequest) {
      throw new ConflictException(
        'No se puede cambiar el estado de una solicitud eliminada',
      );
    }

    requestExists.state = state;

    return await this.requestRepository.save(requestExists);
  }
}
