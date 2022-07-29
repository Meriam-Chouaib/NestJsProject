import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose"
import {UserDocument, User} from "./schemas/user.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }
    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        try{
            return this.userModel.findOne(userFilterQuery);

        }
        catch(error){
            console.log(error)
        }
    }
    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        try{
            return this.userModel.find(usersFilterQuery)
        }
    catch(error){
        console.log(error)
    }
    }

    async create(user:User): Promise <User>{
        try{
            const newUser = new this.userModel(user);
            return newUser.save()
        }
        catch(error){
            console.log(error)
        }

    }
    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user:Partial<User>): Promise<User>{
        try{
            return this.userModel.findOneAndUpdate(userFilterQuery, user);

        }
        catch(error){
            console.log(error)
        }
    }
}