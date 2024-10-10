import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';
import { FileModule } from 'modules/file';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [SequelizeModule.forFeature([Category]), FileModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
