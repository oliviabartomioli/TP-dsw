import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users-dto';

@Controller('api/v1/users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createUser')
  createUser(@Body() user: UsersDto) {
    return this.usersService.createUser(user);
  }

  @Get('/:dniUs')
  getUserBydniUs(@Param('dniUs') dniUs: number) {
    return this.usersService.findUser(dniUs);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('delete/deleted')
  getUsersDeleted() {
    return this.usersService.findAllDeleted();
  }

  @Put()
  updateUsers(@Body() user: UsersDto) {
    return this.usersService.updateUsers(user);
  }

  @Delete('/:dniUs')
  deleteUsers(@Param('dniUs') dniUs: number) {
    return this.usersService.deleteUsers(dniUs);
  }

  @Patch('/restore/:dniUs')
  restoreUsers(@Param('dniUs') dniUs: number) {
    return this.usersService.restoreUsers(dniUs);
  }
}
