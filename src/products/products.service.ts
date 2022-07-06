import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }
  getProducts() {
    return [...this.products];
  }
  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0]; //because the function retuen an array with first element index ans second product of product in array
    return { ...product };
  }
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    /* or we can write wth this way
    const product = this.findProduct(productId)[0];
    const index = this.findProduct(productId)[1]; */
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
  }
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find the product');
    }
    return [product, productIndex];
  }
  deleteProduct(productId: string) {
    const index = this.findProduct(productId)[1];
    this.products.splice(index, 1); //it means delete just one product from that index
  }
}
