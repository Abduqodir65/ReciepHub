import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Meal } from "./models";
import { FileService } from "modules/file";
import { CreateMealDto, UpdateMealDto } from "./dtos";

@Injectable()
export class MealService {
    constructor(@InjectModel(Meal) private mealModel: typeof Meal, private readonly fileService: FileService) { }

    async getAllMeals(): Promise<Meal[]> {
        return await this.mealModel.findAll()
    }

    async getMealById(id: number): Promise<Meal> {
        return await this.mealModel.findOne({
            where: { id }
        });
    }

    async createMeal(payload: CreateMealDto, file: Express.Multer.File): Promise<{ message: string; new_meal: Meal }> {
        const image = await this.fileService.uploadFile(file)
        const video = await this.fileService.uploadFile(file)

        const new_meal = await this.mealModel.create({
            name: payload.name,
            description: payload.description,
            image,
            video,
            category_id: payload.category_id,
            user_id: payload.user_id
        });

        return { message: 'Meal created successfully', new_meal }
    }

    async updateMeal(id: number, payload: UpdateMealDto,file?: Express.Multer.File ): Promise<{ message: string; updatedMeal: Meal }> {
        const meal = await this.mealModel.findOne({ where: { id } });
        if (!meal) {
            throw new NotFoundException(`Meal with id ${id} not found`);
        }
        let image = meal.image;
        let video = meal.video

        if (file) {
            image = await this.fileService.uploadFile(file);
            video = await this.fileService.uploadFile(file)

            await this.fileService.deleteFile(meal.image);
            await this.fileService.deleteFile(meal.video)
            
        }
        await this.mealModel.update(
            {
                ...payload,
                image 
            },
            { where: { id } }
        );
        const updatedMeal = await this.mealModel.findOne({ where: { id } });
        return {
            message: "Product updated successfully",
            updatedMeal,
        };
    }

    async deleteMeal(id: number): Promise<{ message: string }> {
        const foundedMeal = await this.mealModel.findByPk(id)

        await this.fileService.deleteFile(foundedMeal.image)
        foundedMeal.destroy()

        return {
            message: "Meal deleted successfully"
        }
    }
}