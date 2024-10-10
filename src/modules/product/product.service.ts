import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models';
import { FileService } from '../file/file.service';
import { CreateProductDto, UpdateProductDto } from './dtos';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private productModel: typeof Product,
        private readonly fileService: FileService,
    ) { }

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.findAll();
    }

    async getProductById(id: number): Promise<Product> {
        return await this.productModel.findOne({
            where: { id },
        });
    }

    async createProduct(
        payload: CreateProductDto,
        file: Express.Multer.File,
    ): Promise<{ message: string; new_product: Product }> {
        const image = await this.fileService.uploadFile(file);

        const new_product = await this.productModel.create({
            name: payload.name,
            image,
        });

        return { message: 'Product created successfully', new_product };
    }

    async updateProduct(
        id: number,
        payload: UpdateProductDto,
        file?: Express.Multer.File,
    ): Promise<{ message: string; updatedProduct: Product }> {
        const product = await this.productModel.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        let image = product.image;
        if (file) {
            image = await this.fileService.uploadFile(file);

            await this.fileService.deleteFile(product.image);
        }
        await this.productModel.update(
            {
                ...payload,
                image,
            },
            { where: { id } },
        );
        const updatedProduct = await this.productModel.findOne({ where: { id } });
        return {
            message: 'Product updated successfully',
            updatedProduct,
        };
    }
    async deleteProduct(id: number): Promise<{ message: string }> {
        const foundedProduct = await this.productModel.findByPk(id);

        await this.fileService.deleteFile(foundedProduct.image);
        foundedProduct.destroy();

        return {
            message: 'User deleted successfully',
        };
    }
}
