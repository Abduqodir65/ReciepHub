import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), FileModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
