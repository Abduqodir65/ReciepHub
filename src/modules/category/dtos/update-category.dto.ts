import { IsNotEmpty, IsString } from "class-validator";
import { CreateCategoryRequest } from "../interfaces";

export class UpdateCategoryDto implements Omit<CreateCategoryRequest, "image"> {
    @IsString()
    name: string

    @IsString()
    description: string

    image:any
}