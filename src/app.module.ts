import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import{UsersService} from './users/users.service'
import { JwtService } from '@nestjs/jwt';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersRepository} from "./users/users.repository";

@Module({
  imports: [UsersModule, ProductsModule, AuthModule,MongooseModule.forRoot('mongodb://localhost/nestDB')],
  controllers: [AppController],
  providers: [AuthService, AppService, JwtService,UsersService,UsersRepository],
})
export class AppModule {}
