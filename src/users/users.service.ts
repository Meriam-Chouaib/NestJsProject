import { Injectable } from '@nestjs/common';
import {successResult} from "../helper/success-result";
import {User} from "../schemas/user.schema";
import {v4 as uuidv4} from 'uuid'
import {UsersRepository} from "./users.repository";
import {count} from "rxjs";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository:UsersRepository) {
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({id});
  }

  async getUsers(): Promise<successResult> {
    try{
     return new successResult(true, this.usersRepository.find({}) ,1, "success");
     // return this.usersRepository.find({});
    }catch(error){
      return new successResult(false, [],0, error);
    }

  }


  async createUser(name: string,username: string,password: string){
    try{


      return new successResult(true, this.usersRepository.create({
        id: uuidv4(),
        name,
        username,
        password
        //favoriteProduct : [] exp if i want each user have a list of favoris
      }) ,1, "success");
    }catch(error){

      return new successResult(false, [],0, error);
    }

  }
  async updateUser(id:string, userUpdates: UpdateUserDto): Promise<successResult>{
try{
  return new successResult(true, this.usersRepository.findOneAndUpdate({id}, userUpdates),1, "success");
  // return this.usersRepository.findOneAndUpdate({id}, userUpdates);
}catch(error){
  return new successResult(false, [],0, error);

}

  }


}
