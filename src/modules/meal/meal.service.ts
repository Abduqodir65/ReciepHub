import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Meal } from "./models";
import { FileService } from "modules/file";
import { CreateMealDto } from "./dtos";

@Injectable()
export class MealService {
    constructor(@InjectModel(Meal) private mealModel: typeof Meal, private readonly fileService: FileService) { }

    async getAllMeals(): Promise<Meal[]> {
        return await this.mealModel.findAll()
    }

    async getSingleMeal(id: number): Promise<Meal> {
        return await this.mealModel.findOne({
            where: { id }
        })
    }

    async createMeal(
        payload: CreateMealDto,
        imageFile: Express.Multer.File,
        videoFile: Express.Multer.File
    ): Promise<{ message: string, new_meal: Meal }> {
        
        const image = await this.fileService.uploadFile(imageFile);  
        const video = await this.fileService.uploadFile(videoFile);  
    
        const new_meal = await this.mealModel.create({
            name: payload.name,
            description: payload.description,
            image,  
            video,   
            category_id: payload.category_id,
            user_id: payload.user_id,
        });
    
        return {
            message: 'Meal Created Successfully',
            new_meal,
        };
    }
    
    async deleteMeal(id: number): Promise<{ message: string }> {
        const foundedMeal = await this.mealModel.findByPk(id)

        await this.fileService.deleteFile(foundedMeal.image)
        await this.fileService.deleteFile(foundedMeal.video)

        return {
            message: 'Meal deleted successfully'
        }
    }
}