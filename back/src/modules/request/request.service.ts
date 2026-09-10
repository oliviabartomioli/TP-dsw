<<<<<<< HEAD
<<<<<<< HEAD
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { requestDto } from "./dto/request-dto";
import { request } from "./entity/request.entity";
=======
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { requestDto } from './dto/request-dto';
import { request } from './entity/request.entity';
>>>>>>> parent of 141d88c (modulo request finalizado)
=======
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { requestDto } from './dto/request-dto';
import { request } from './entity/request.entity';
>>>>>>> parent of ab56bb6 (modificación comillas)

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<request>,
  ) {}
  async createRequests(requests: requestDto) {
    const requestExists = await this.findRequest(requests.idRequest);
    if (requestExists) {
<<<<<<< HEAD
<<<<<<< HEAD
      throw new ConflictException("La solicitud ya existe");
=======
      throw new ConflictException('La solicitud ya existe');
>>>>>>> parent of ab56bb6 (modificación comillas)
    } else {
      return await this.requestRepository.save(requests);
    }
  }
  async findRequest(idRequest: number) {
    return await this.requestRepository.findOne({ where: { idRequest } });
  }
  async findAll() {
    return await this.requestRepository.find({
      where: { deleteRequest: false },
    });
  }
  async deleteRequests(idRequest: number) {
    const requestsExists = await this.findRequest(idRequest);
    if (!requestsExists) {
      throw new ConflictException(
        'La solicitud con id:' + idRequest + 'no existe',
      );
    }
    if (requestsExists.deleteRequest) {
      throw new ConflictException(
        'La solicitud con id' + idRequest + 'esta eliminada',
      );
    }
    const rows: UpdateResult = await this.requestRepository.update(
      { idRequest },
      { deleteRequest: true },
    );
    return rows.affected == 1;
  }
  async restoreRequest(idRequest: number) {
    const RequestExists = await this.findRequest(idRequest);

    if (!RequestExists) {
      throw new ConflictException(
        'La solicitud con idRequest ' + idRequest + ' no existe',
      );
    }
    if (!RequestExists.deleteRequest) {
      throw new ConflictException('la solicitud no esta eliminada');
    }

    const rows: UpdateResult = await this.requestRepository.update(
      { idRequest },
      { deleteRequest: false },
    );
    return rows.affected == 1;
  }
  async updateRequests(requests: requestDto) {
=======
      throw new ConflictException('La solicitud ya existe');
    }
>>>>>>> parent of 141d88c (modulo request finalizado)
    return await this.requestRepository.save(requests);
  }
}
