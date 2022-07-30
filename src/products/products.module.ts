import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {UsersService} from "../users/users.service";
import {UsersRepository} from "../users/users.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";
import {UsersController} from "../users/users.controller";
import {ProductSchema} from "../schemas/product.schema";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,UsersRepository,UsersService],
  exports: [UsersService,ProductsService],
  imports: [MongooseModule.forFeature([{name:'Product', schema:ProductSchema}]),ProductsService],


  // providers: [UsersRepository,UsersService,ProductsService],
  // imports: [MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  // controllers: [UsersController],
  // exports: [UsersService,ProductsService]
})
export class ProductsModule {}
