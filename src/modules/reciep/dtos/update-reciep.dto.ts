import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CreateReciepRequest } from "../interfaces";

export class UpdateReciepDto implements Omit<CreateReciepRequest, "image"> {
    @IsString()
    name: string

    @IsString()
    description: string

    image: string;

    video: string;

    @IsNumberString()
    user_id: number;

    @IsNumberString()
    category_id: number;

}