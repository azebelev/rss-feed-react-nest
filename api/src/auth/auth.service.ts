import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/domains/user/user.service';
import { User } from 'src/persistence/entities/user.entity';

const EXPIRE_TIME = 2000 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { name, role, email } = user;
      return { name, role, email };
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: this.jwtService.sign(payload, { expiresIn: '2000s' }),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '20s' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
