import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meal } from './models';
import { FileModule } from 'modules/file';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';

@Module({
    imports: [SequelizeModule.forFeature([Meal]), FileModule],
    controllers: [MealController],
    providers: [MealService],
})
export class MealModule { }
