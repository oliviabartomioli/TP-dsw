import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { requestDto } from './dto/request-dto';
import { request } from './entity/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<request>,
  ) {}
  async createRequests(requests: requestDto) {
    const requestExists = await this.findRequest(requests.idRequest);
    if (requestExists) {
      throw new ConflictException('La solicitud ya existe');
    }
    return await this.requestRepository.save(requests);
  }
}
