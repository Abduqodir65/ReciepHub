import { IsInt,  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserRequest } from "../interfaces";

export class CreateUserDto implements Omit<CreateUserRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNumber()
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
    password: string;

    @IsString()
    @IsNotEmpty()
    role: "customer" | "admin";

    image:any

}