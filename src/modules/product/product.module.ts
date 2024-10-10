import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./models";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { FileService } from "modules/file";

@Module({
    imports: [SequelizeModule.forFeature([Product]), FileService],
    providers: [ProductService],
    controllers: [ProductController]
})

export class ProductModule { }