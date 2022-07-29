import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
    Headers,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {successResult} from "../helper/success-result";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    // @Body() completeBody: {title: string, description: string,price:number} //or we can use this way for alla body
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
     // @Headers('')
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {

      return this.productsService.getProducts();

  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    //return this.productsService.getSingleProduct(prodId);

      return  this.productsService.getSingleProduct(prodId)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return null;
  }
  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
   return this.productsService.getProducts();

  }
}
