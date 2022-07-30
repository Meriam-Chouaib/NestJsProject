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
import {Product,ProductSchema} from "./schemas/product.schema";
import {ProductsService} from "./products/products.service";
import {ProductsController} from "./products/products.controller";
import {UserSchema} from "./schemas/user.schema";
import {UsersController} from "./users/users.controller";

@Module({
  imports: [UsersModule, ProductsModule, AuthModule,MongooseModule.forRoot('mongodb://localhost/nestDB'),
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],

  controllers: [AppController,ProductsController,UsersController],
  providers: [AuthService, AppService, JwtService,UsersService,UsersRepository,ProductsService],
})
export class AppModule {}
