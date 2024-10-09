import { IsInt, IsString } from "class-validator";
import { CreateUserRequest } from "../interfaces";

export class UpdateUserDto implements Omit<CreateUserRequest, "image"> {
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
    password: string;

    @IsString()
    role: "customer" | "admin";
    
    image:any

}