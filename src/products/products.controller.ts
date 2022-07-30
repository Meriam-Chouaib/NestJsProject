import {  Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {Product} from 'src/schemas/product.schema';
import { ProductsService } from './products.service';
import {successResult} from "../helper/success-result";
import {response} from "express";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(@Res() @Body() product: Product) {
    const newProduct = await this.productsService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct
    })
  }
  @Get()
  async getAllProducts(@Res() response) {
    const products = await this.productsService.getProducts();

    return response.status(HttpStatus.OK).json({
      products
    })
  }

  @Get('/:id')
  async getSingleProduct(@Res() response, @Param('id') id) {
    const product = await this.productsService.getSingleProduct(id);

      return   response.status(HttpStatus.OK).json({
        product
      })
  }

  @Put('/:id')
  async updateProduct(@Res() response, @Param('id') id, @Body() product: Product) {

    const updatedProduct = await this.productsService.updateProduct(id, product);
    return response.status(HttpStatus.OK).json({
      updatedProduct
    })
  }
  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') id) {
    const deletedProduct = await this.productsService.deleteProduct(id);

    return response.status(HttpStatus.OK).json({
      deletedProduct
    })
  }
}
