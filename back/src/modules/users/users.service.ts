import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UsersDto } from './dto/users-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: UsersDto) {
    const userExists = await this.findUser(user.dniUs);
    if (userExists) {
      throw new ConflictException('Usuario ya registrado');
    } else {
      const salt = await bcrypt.genSalt(10);
      user.passwordU = await bcrypt.hash(user.passwordU, salt);
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
    const userExists = await this.findUser(user.dniUs);
    if (!userExists) {
      throw new NotFoundException(
        'El usuario con dniUs: ' + user.dniUs + ' no existe',
      );
    }
    if (userExists.deleteU) {
      throw new ConflictException(
        'El usuario con dniUs: ' + user.dniUs + ' esta eliminado',
      );
    }
    if (user.passwordU) {
      user.passwordU = await bcrypt.hash(user.passwordU, 10);
    }
    return await this.userRepository.save(user);
  }

  async deleteUsers(dniUs: number) {
    const userExists = await this.findUser(dniUs);
    if (!userExists) {
      throw new NotFoundException(
        'El usuario con dniUs: ' + dniUs + ' no existe',
      );
    }
    if (userExists.deleteU) {
      throw new ConflictException(
        'El usuario con dniUs: ' + dniUs + ' ya esta eliminado',
      );
    }
    const rows: UpdateResult = await this.userRepository.update(
      { dniUs },
      { deleteU: true },
    );
    return rows.affected === 1;
  }

  async restoreUsers(dniUs: number) {
    const UserExists = await this.findUser(dniUs);

    if (!UserExists) {
      throw new ConflictException(
        'El usuario con dniUs ' + dniUs + ' no existe',
      );
    }
    if (!UserExists.deleteU) {
      throw new ConflictException(
        'El usuario con dniUs: ' + dniUs + ' no esta eliminado',
      );
    }

    const rows: UpdateResult = await this.userRepository.update(
      { dniUs },
      { deleteU: false },
    );
    return rows.affected === 1;
  }
  async validatePassword(
    password: string,
    storedHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedHash);
  }
}
