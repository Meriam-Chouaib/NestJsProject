import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {UsersService} from "./users/users.service";

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService,private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard) // after getting true here from the localauthguard we can go to /login
  //check if the user have the right to accede to thar route
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
    // { msg: req.user }; //return JWT access token

    //from here we can recover(recupere) the informtaion of the user that logged in
    //allow a cookie from here
  }
  // @Post('register')
  // register(@Request() req): any {
  //
  //  return this.usersService.createUser(req.body.id,req.body.name,req.body.username,req.body.password);
  //
  // }
  // @Get('protected')
  // getHello(@Request() req): string {
  //   //require to have an access token
  //
  //   return req.user;
  // }
  // @Get('users')
  // getUsers(@Request() req): string {
  //   //require to have an access token
  //
  //   return req.users;
  // }

}
