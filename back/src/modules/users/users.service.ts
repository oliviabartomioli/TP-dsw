import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users-dto';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: UsersDto) {
    const UserExists = await this.findUser(user.dniUs);
    if (UserExists) {
      throw new ConflictException('Usuario ya registrado');
    } else {
      return await this.userRepository.save(user);
    }
  }

  async findUser(dniUs: number) {
    return await this.userRepository.findOne({ where: { dniUs } });
  }

  async findAll() {
    return await this.userRepository.find({ where: { deleteU: false } });
  }

  async findAllDeleted() {
    return await this.userRepository.find({ where: { deleteU: true } });
  }

  async updateUsers(user: UsersDto) {
    return await this.userRepository.save(user);
  }

  async deleteUsers(dniUs: number) {
    const UserExists = await this.findUser(dniUs);
    if (!UserExists) {
      throw new ConflictException(
        'El usuario con dniUs: ' + dniUs + 'no existe',
      );
    }
    if (UserExists.deleteU) {
      throw new ConflictException('El usuario ya esta eliminado');
    }
    const rows: UpdateResult = await this.userRepository.update(
      { dniUs },
      { deleteU: true },
    );
    return rows.affected == 1;
  }

  async restoreUsers(dniUs: number) {
    const UserExists = await this.findUser(dniUs);

    if (!UserExists) {
      throw new ConflictException(
        'El usuario con dniUs ' + dniUs + ' no existe',
      );
    }
    if (!UserExists) {
      throw new ConflictException('el usuario no esta eliminado');
    }

    const rows: UpdateResult = await this.userRepository.update(
      { dniUs },
      { deleteU: false },
    );
    return rows.affected == 1;
  }
}
