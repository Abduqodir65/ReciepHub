import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { CreateRatingDto, UpdateRatingDto } from "./dtos";
import { Rating } from "./models";

@Controller('rating')
export class RatingController {
    #_service: RatingService;

    constructor(service: RatingService) {
        this.#_service = service
    }

    @Get()
    async getAllRatings(): Promise<Rating[]> {
        return await this.#_service.getAllRatings()
    }

    @Get('/:id')
    async getRatingById(@Param('id') id:string): Promise<Rating> {
        return await this.#_service.getRatingById(Number(id))
    }

    @Post('/add')
    async createRating(@Body() createRatingPayload: CreateRatingDto): Promise<{ message:string,new_rating:CreateRatingDto}> {
        await this.#_service.createRating(createRatingPayload)

        return {
            message: 'Rating created successfully',
            new_rating: createRatingPayload
        }
    }

    @Patch('update/:id')
    async updateRating(
        @Param('id') id:string,
        @Body() updateRatingPayload: UpdateRatingDto
    ): Promise<{ message:string, updatedRating: UpdateRatingDto }> {
        await this.#_service.updateRating(Number(id), updateRatingPayload)

        return {
            message: 'Rating updated successfully',
            updatedRating: updateRatingPayload
        }
    }

    @Delete('delete/:id')
    async deleteRating(@Param('id') id:string):Promise<{message:string}>{
        return this.#_service.deleteRating(+id)
    }
}