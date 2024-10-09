import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Reciep } from "./models";
import { FileService } from "modules/file";
import { CreateReciepDto, UpdateReciepDto } from "./dtos";

@Injectable()
export class ReciepService {
    constructor(@InjectModel(Reciep) private reciepModel: typeof Reciep, private readonly fileService: FileService ) { }

    async getAllRecieps(): Promise<Reciep[]> {
        return await this.reciepModel.findAll()
    }

    async getReciepById(id: number): Promise<Reciep> {
        return await this.reciepModel.findOne({
            where: { id }
        });
    }

    async createReciep(payload: CreateReciepDto, file:Express.Multer.File): Promise<{ message:string; new_reciep:Reciep}> {
        const image = await this.fileService.uploadFile(file)
        const video = await this.fileService.uploadFile(file)

        const new_reciep = await this.reciepModel.create({
            name: payload.name,
            description: payload.description,
            image,
            video,
            user_id: payload.user_id,
            category_id: payload.category_id
        });

        return { message: 'Reciep created successfully', new_reciep }
    }

    async updateReciep(id:number,payload: UpdateReciepDto): Promise<{ message: string, updatedReciep: Reciep }> {
        await this.reciepModel.update(payload, {
            where: {id}
        });
        const updatedReciep = await this.reciepModel.findOne({ where: {id} })
        return { message: 'User updated successfully', updatedReciep }
    }

    async deleteReciep(id:number):Promise< {message:string}> {
        const foundedReciep = await this.reciepModel.findByPk(id)

        await this.fileService.deleteFile(foundedReciep.image)
        await this.fileService.deleteFile(foundedReciep.video)
        
        foundedReciep.destroy()

        return {
            message: 'Reciep deleted successfully'
        }
    }
}