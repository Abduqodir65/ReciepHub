import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './models';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  #_service: ProductService;

  constructor(service: ProductService) {
    this.#_service = service;
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.#_service.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.#_service.getProductById(Number(id));
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() createProductPayload: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ message: string; new_product: CreateProductDto }> {
    await this.#_service.createProduct(createProductPayload, image);

    return {
      message: 'Product created successfully',
      new_product: createProductPayload,
    };
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductPayload: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; updatedProduct: UpdateProductDto }> {
    const { updatedProduct } = await this.#_service.updateProduct(
      Number(id),
      updateProductPayload,
      file,
    );
    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_service.deleteProduct(+id);
  }
}
