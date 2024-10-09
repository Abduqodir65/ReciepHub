import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CreateReciepRequest } from "../interfaces";

export class CreateReciepDto implements Omit<CreateReciepRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    video: string;

    @IsNumberString()
    @IsNotEmpty()
    user_id: number;

    @IsNumberString()
    @IsNotEmpty()
    category_id: number;

}