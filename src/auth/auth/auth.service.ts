import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

const users = [
  {
    id: 1,
    username: 'user1@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K', //123456
    role: 'admin',
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = users.find((u) => u.username === username);
    if (user == null) {
      throw new BadRequestException();
    }
    const passwordISMatch = await compare(password, user.password);
    if (passwordISMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const userIsValid = await this.validateUser(user.username, user.password);
    console.log(userIsValid);
    if (!userIsValid) {
      new BadRequestException();
    }
    const payload = { username: userIsValid.username, sub: userIsValid.id };
    return {
      token: this.jwtService.sign(payload),
      type: 'Bearer',
    };
  }

  findAll() {
    return users;
  }
}
