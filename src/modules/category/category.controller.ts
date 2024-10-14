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
import { CategoryService } from './category.service';
import { Category } from './models';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.#_service.getAllCategories();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<Category> {
    return await this.#_service.getCategoryById(Number(id));
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ message: string; new_category: CreateCategoryDto }> {
    await this.#_service.createCategory(createCategoryPayload, image);

    return {
      message: 'User created successfully',
      new_category: createCategoryPayload,
    };
  }

  @Patch('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryPayload: UpdateCategoryDto,
  ): Promise<{ message: string; updatedCategory: UpdateCategoryDto }> {
    await this.#_service.updateCategory(Number(id), updateCategoryPayload);

    return {
      message: 'Category updated successfully',
      updatedCategory: updateCategoryPayload,
    };
  }

  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_service.deleteCategory(+id);
  }
}
