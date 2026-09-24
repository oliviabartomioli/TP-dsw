import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dniUs: number, pass: string): Promise<any> {
    const user = await this.usersService.findUser(dniUs);
    if (
      user &&
      (await this.usersService.validatePassword(pass, user.passwordU))
    ) {
      const { passwordU: _passwordU, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { dniUs: user.dniUs };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
