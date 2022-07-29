import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {User} from "../model/user-model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, //for the tokens (securely transmitting information between parties as a JSON object)
  ) {}
  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserById(id);
    if (user && user.password === pass) {
      const { password, username, ...result } = user;
      return result; //result contain the id and the name of this user
    }
    return null;
  }
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'secret' }),
    };
  }
  async register(user: User) {

    await this.usersService.createUser(user.name,user.username,user.password)
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'secret' }),
    };
  }

}
