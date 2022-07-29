import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.module';
import {ResultModel} from "../model/result-model";
import {successResult} from "../helper/success-result";

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private result : ResultModel = {message: "", success: false} ;
 count =0;

  insertProduct(title: string, description: string, price: number) {
    try{
      const prodId = Math.random().toString();
      const newProduct = new Product(prodId, title, description, price);
      this.products.push(newProduct);
      //return prodId;
      return new successResult(true, prodId,this.count+1, "success");


    }catch(error){
      return new successResult(false, [],0, "failed");

    }

  }
  getProducts() {


    try{
    return new successResult(true, this.products,this.products.length, "success");
    }
    catch(error){
      console.log(error)
      return new successResult(false, [],0, "failed");
    }

  }
  getSingleProduct(productId: string) {
   try{
     const product = this.findProduct(productId)[0]; //because the function return an array with first element index ans second product of product in array
     return new successResult(true, product,1, "success");
   }catch(error){
     console.log(error)
     return new successResult(false, [],0, "failed");
   }
   // return { ...product };
  }
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    /* or we can write wth this way
    const product = this.findProduct(productId)[0];
    const index = this.findProduct(productId)[1]; */
    //const [product, index] = this.findProduct(productId);

    try{
      const product = this.findProduct(productId)[0];
      const index = this.findProduct(productId)[1];
      const updatedProduct = { ...product }; //...product it means i want to recupere the old data of this product

      //Modify only the changed elements
      if (title) {
        updatedProduct.title = title;
      }
      if (description) {
        updatedProduct.description = description;
      }
      if (price) {
        updatedProduct.price = price;
      }
      this.products[index] = updatedProduct;
      return new successResult(true, this.products,1, "success");

    }catch(error)
    {
      return new successResult(false, [],0, error);

    }
  }
  //private findProduct(id: string): [Product, number] {
  private findProduct(id: string) {
    try {
//const productIndex = this.products.indexOf(id)
      const productIndex = this.products.findIndex(id => product.id );

      const product = this.products[productIndex];

      return new successResult(true, product,1, "success");

      return [product, productIndex];
  }catch(error){
      return new successResult(false, [],0, error);

    }
  }
  deleteProduct(productId: string) {
    try{
      const index = this.findProduct(productId)[1];
      this.products.splice(index, 1); //it means delete just one product from that index
      return new successResult(true,[],1, "delete success");

    }catch(error){
      return new successResult(false, [],0, error);

    }

  }
}
