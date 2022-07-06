import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  //POST /login
  @Post('login')
  login(@Request() req): any {
    return req.user; //from here we can recover(recupere) the informtaion of the user that logged in
  }

  //GET /protected (after login this route is protected)
  @UseGuards(AuthenticatedGuard) //check if the user have the right to accede to thar route
  @Get('protected')
  getHello(@Request() req): string {
    // return this.appService.getHello();
    return req.user;
  }
}
