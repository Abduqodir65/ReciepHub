import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Meal} from "./models";
import { FileService } from "modules/file";
import { MealService } from "./meal.service";
import { MealController } from "./meal.controller";

@Module({
    imports: [SequelizeModule.forFeature([Meal]), FileService],
    providers: [MealService],
    controllers: [MealController]
})

export class MealModule { }