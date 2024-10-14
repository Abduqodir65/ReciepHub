import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { MealService } from "./meal.service";
import { Meal } from "./models";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CreateMealDto } from "./dtos";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Meal')
@Controller('meal')
export class MealController {
    constructor(private readonly service: MealService) { }

    @Get()
    async getAllMeals(): Promise<Meal[]> {
        return await this.service.getAllMeals()
    }

    @Get('/:id')
    async getSingleMeal(id: number): Promise<Meal> {
        return await this.service.getSingleMeal(id)
    }

    @Post('/add')
    @UseInterceptors(
        FileFieldsInterceptor([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }])
    )
    async createMeal(
        @Body() createMealPayload: CreateMealDto,
        @UploadedFiles() files: { image: Express.Multer.File[], video: Express.Multer.File[] }
    ): Promise<{ message: string; new_meal: CreateMealDto }> {
        try {
            const newMealResponse = await this.service.createMeal(createMealPayload, files.image[0], files.video[0]);

            return {
                message: 'Meal created successfully',
                new_meal: newMealResponse.new_meal,
            };
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to create meal');
        }
    }
    @Delete("/delete/:id")
    async deleteMeal(@Param('id') id: string): Promise<{ message: string }> {
        return await this.service.deleteMeal(+id)
    }
}