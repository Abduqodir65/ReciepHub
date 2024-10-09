import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CreateRatingRequest } from "../interfaces";

export class CreateRatingDto implements Omit<CreateRatingRequest, "image"> {
    @IsNumberString()
    @IsNotEmpty()
    rating:number;

    @IsNumberString()
    @IsNotEmpty()
    user_id: number;

    @IsNumberString()
    @IsNotEmpty()
    reciep_id: number;

}