import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ReciepService } from "./reciep.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateReciepDto, UpdateReciepDto } from "./dtos";
import { Reciep } from "./models";

@Controller('reciep')
export class ReciepController {
    #_service: ReciepService;

    constructor(service: ReciepService) {
        this.#_service = service
    }

    @Get()
    async getAllRecieps(): Promise<Reciep[]> {
        return await this.#_service.getAllRecieps()
    }

    @Get('/:id')
    async getReciepById(@Param('id') id:string): Promise<Reciep> {
        return await this.#_service.getReciepById(Number(id))
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor('image')) 
    async createReciep(@Body() createReciepPayload: CreateReciepDto, @UploadedFile() image: Express.Multer.File): Promise<{ message:string,new_reciep:CreateReciepDto}> {
        await this.#_service.createReciep(createReciepPayload, image)

        return {
            message: 'Reciep created successfully',
            new_reciep: createReciepPayload
        }
    }

    @Patch('update/:id')
    async updateReciep(
        @Param('id') id:string,
        @Body() updateReciepPayload: UpdateReciepDto
    ): Promise<{ message:string, updatedReciep: UpdateReciepDto }> {
        await this.#_service.updateReciep(Number(id), updateReciepPayload)

        return {
            message: 'Reciep updated successfully',
            updatedReciep: updateReciepPayload
        }
    }

    @Delete('delete/:id')
    async deleteReciep(@Param('id') id:string):Promise<{message:string}>{
        return this.#_service.deleteReciep(+id)
    }
}