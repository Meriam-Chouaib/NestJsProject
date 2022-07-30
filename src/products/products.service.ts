import { Injectable, NotFoundException } from '@nestjs/common';
//import { Product } from './product.module';
import {ResultModel} from "../model/result-model";
import { InjectModel } from "@nestjs/mongoose";
import {successResult} from "../helper/success-result";
import {Model} from 'mongoose'
import { Product, ProductDocument } from "src/schemas/product.schema";


@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private productModel: Model<ProductDocument>) {}

 //
 //
 //    private products: Product[] = [];
 //  private result : ResultModel = {message: "", success: false} ;
 // count =0;

  async create(product: Product) : Promise<successResult> {

        const newProduct = new this.productModel(product);

        try{
            newProduct.save();
      return new successResult(true,newProduct,1, "success");


    }catch(error){
      return new successResult(false, [],0, "failed");

    }
  }

    async getProducts(): Promise<successResult> {


    try{
    return new successResult(true, await this.productModel.find().exec(),1, "success");
    }
    catch(error){

      return new successResult(false, [],0, error);
    }

  }
    async getSingleProduct(id) : Promise<successResult> {
   try{

       return new successResult(true, await this.productModel.findById(id).exec(),1, "success");

   }catch(error){

     return new successResult(false, [],0, error);
   }
   // return { ...product };
  }
    async updateProduct(id,product:Product) : Promise<successResult>
    {

        try{

            return new successResult(true, await this.productModel.findByIdAndUpdate(id, product, {new: true}),1, "success");

        }catch(error){

            return new successResult(false, [],0, error);
        }



  }

  async deleteProduct(id): Promise<successResult> {
    try{



      return new successResult(true,await this.productModel.findByIdAndRemove(id),1, "delete success");

    }catch(error){
      return new successResult(false, [],0, error);

    }

  }
}
