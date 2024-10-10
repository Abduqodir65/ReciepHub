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
import { MealService } from './Meal.service';
import { CreateMealDto, UpdateMealDto } from './dtos';
import { Meal } from './models';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('meal')
export class MealController {
  #_service: MealService;

  constructor(service: MealService) {
    this.#_service = service;
  }

  @Get()
  async getAllMeals(): Promise<Meal[]> {
    return await this.#_service.getAllMeals();
  }

  @Get('/:id')
  async getMealById(@Param('id') id: string): Promise<Meal> {
    return await this.#_service.getMealById(Number(id));
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createMeal(
    @Body() createMealPayload: CreateMealDto,
    image: Express.Multer.File,
  ): Promise<{ message: string; new_meal: CreateMealDto }> {
    await this.#_service.createMeal(createMealPayload, image);

    return {
      message: 'Meal created successfully',
      new_meal: createMealPayload,
    };
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateMeal(
    @Param('id') id: string,
    @Body() updateMealPayload: UpdateMealDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; updatedMeal: UpdateMealDto }> {
    const { updatedMeal } = await this.#_service.updateMeal(
      Number(id),
      updateMealPayload,
      file,
    );
    return {
      message: 'Meal updated successfully',
      updatedMeal,
    };
  }

  @Delete('delete/:id')
  async deleteMeal(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_service.deleteMeal(+id);
  }
}
