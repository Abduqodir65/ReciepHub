import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MealService } from "./meal.service";
import { Meal } from "./models";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMealDto } from "./dtos";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Meal')
@Controller('meal')
export class MealController {
    constructor(private readonly service: MealService) {}

    @Get()
    async getAllMeals(): Promise<Meal[]> {
        return await this.service.getAllMeals()
    }

    @Get('/:id')
    async getSingleMeal(id:number):Promise<Meal> {
        return await this.service.getSingleMeal(id)
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createMeal(@Body() createMealPayload: CreateMealDto,@UploadedFile() image:Express.Multer.File, video:Express.Multer.File):Promise<{ message: string; new_meal:CreateMealDto }> {
        await this.service.createMeal(createMealPayload,image)

        return {
            message: 'Meal created successfully',
            new_meal: createMealPayload
        }
    }

    @Delete("/delete/:id")
    async deleteMeal(@Param('id') id:string):Promise<{message: string}> {
        return await this.service.deleteMeal(+id)
    }
}