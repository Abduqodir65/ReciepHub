import {  IsNumber, IsNumberString, IsString } from "class-validator";
import { CreateMealRequest } from "../interfaces";

export class UpdateMealDto implements Omit<CreateMealRequest, "image" | "video"> {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsString()
    video: string;

    @IsNumber()
    category_id:number

    @IsNumberString()
    user_id:number
}