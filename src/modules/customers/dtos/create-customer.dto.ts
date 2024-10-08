import { IsInt,  IsNotEmpty, IsString } from "class-validator";
import { CreateCustomerRequest } from "../interfaces";

export class CreateCustomerDto implements Omit<CreateCustomerRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    gender: "male" | "female";

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: "customer" | "admin";

    image:any

}