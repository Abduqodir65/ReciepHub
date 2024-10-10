import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CreateReciepRequest } from "../interfaces";

export class CreateReciepDto implements Omit<CreateReciepRequest, "image"> {
    @IsNotEmpty()
    @IsString()
    quantity: string;
    
    @IsNumberString()
    @IsNotEmpty()
    product_id: number;

    @IsNumberString()
    @IsNotEmpty()
    meal_id: number;

}