import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import {successResult} from "../helper/success-result";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getUser(@Param('userId') userId: string): Promise<User> {
        return this.usersService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<successResult> {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<successResult> {
        try{
            return new successResult(true, this.usersService.createUser(createUserDto.name, createUserDto.username,createUserDto.password),1, "success");
        }catch(error){
            new successResult(false, this.usersService.getUsers(),0, error);
        }

    }

    @Patch(':id')
    async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<successResult> {
        return this.usersService.updateUser(userId, updateUserDto);
    }
}