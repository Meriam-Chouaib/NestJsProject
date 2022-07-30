import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User,UserSchema} from "../schemas/user.schema";
import {UsersController} from "./users.controller";
import {UsersRepository} from "./users.repository";
import {ProductsService} from "../products/products.service";

@Module({
  providers: [UsersRepository,UsersService,ProductsService],
  imports: [MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  controllers: [UsersController],
  exports: [UsersService,ProductsService]
})
export class UsersModule {}
