import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { CreateMealRequest } from "../interfaces";

export class CreateMealDto implements Omit<CreateMealRequest, "image" | "video"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    video: string;

    @IsNumber()
    @IsNotEmpty()
    category_id:number

    @IsNumberString()
    @IsNotEmpty()
    user_id:number
}