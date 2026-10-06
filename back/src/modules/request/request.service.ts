import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { requestDto } from './dto/request-dto';
import { request } from './entity/request.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(request)
    private requestRepository: Repository<request>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createRequests(requests: requestDto) {
    const user = await this.userRepository.findOne({
      where: { dniUs: requests.dniUs },
    });

    if (!user) {
      throw new ConflictException(
        'El usuario con DNI ' + requests.dniUs + ' no existe',
      );
    }

    const newRequest = this.requestRepository.create({
      date: requests.date,
      state: requests.state,
      deleteRequest: requests.deleteRequest,
      user: user,
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
      },
    });
  }

  async findAllDelete() {
    return await this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
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
    return await this.requestRepository.save(requests);
  }
}