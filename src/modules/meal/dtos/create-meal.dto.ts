import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { CreateMealRequest } from "../interfaces";

export class CreateMealDto implements Omit<CreateMealRequest, "image" | "video"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    image: any;

    video: any;

    @IsNotEmpty()
    category_id:number

    @IsNotEmpty()
    user_id:number
}