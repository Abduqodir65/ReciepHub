import { IsInt,  IsNotEmpty, IsString } from "class-validator";
import { CreateCustomerRequest } from "../interfaces";

export class UpdateCustomerDto implements Omit<CreateCustomerRequest, "image"> {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsInt()
    age: number;

    @IsString()
    gender: "male" | "female";

    @IsString()
    email: string;

    @IsString()
    role: "customer" | "admin";
    
    image:any

}