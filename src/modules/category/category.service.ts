import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models';
import { FileService } from 'modules/file';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    private readonly fileService: FileService,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryModel.findOne({
      where: { id },
    });
  }

  async createCategory(
    payload: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<{ message: string; new_category: Category }> {
    const image = await this.fileService.uploadFile(file);

    const new_category = await this.categoryModel.create({
      name: payload.name,
      image,
    });

    return { message: 'Category created successfully', new_category };
  }

  async updateCategory(
    id: number,
    payload: UpdateCategoryDto,
  ): Promise<{ message: string; updatedCategory: Category }> {
    await this.categoryModel.update(payload, {
      where: { id },
    });
    const updatedCategory = await this.categoryModel.findOne({ where: { id } });
    return { message: 'User updated successfully', updatedCategory };
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const foundedCategory = await this.categoryModel.findByPk(id);

    await this.fileService.deleteFile(foundedCategory.image);
    foundedCategory.destroy();

    return {
      message: 'Category deleted successfully',
    };
  }
}
