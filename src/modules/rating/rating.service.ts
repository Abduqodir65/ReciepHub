import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Rating } from "./models";
import { FileService } from "modules/file";
import { CreateRatingDto, UpdateRatingDto } from "./dtos";

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating) private ratingModel: typeof Rating ) { }

    async getAllRatings(): Promise<Rating[]> {
        return await this.ratingModel.findAll()
    }

    async getRatingById(id: number): Promise<Rating> {
        return await this.ratingModel.findOne({
            where: { id }
        });
    }

    async createRating(payload: CreateRatingDto): Promise<{ message:string; new_rating:Rating}> {
        const new_rating = await this.ratingModel.create({
            rating:payload.rating,
            user_id: payload.user_id,
            reciep_id: payload.reciep_id
        });

        return { message: 'Reciep created successfully', new_rating }
    }

    async updateRating(id:number,payload: UpdateRatingDto): Promise<{ message: string, updatedRating: Rating }> {
        await this.ratingModel.update(payload, {
            where: {id}
        });
        const updatedRating = await this.ratingModel.findOne({ where: {id} })
        return { message: 'User updated successfully', updatedRating }
    }

    async deleteRating(id:number):Promise< {message:string}> {
        await this.ratingModel.destroy({
            where: {id}
        })
        return {
            message: 'Rating deleted successfully'
        }
    }
}