import { IsNumberString, IsString } from "class-validator";
import { CreateRatingRequest } from "../interfaces";

export class UpdateRatingDto implements Omit<CreateRatingRequest, "image"> {
    @IsNumberString()
    rating:number;

    @IsNumberString()
    user_id: number;

    @IsNumberString()
    reciep_id: number;

}