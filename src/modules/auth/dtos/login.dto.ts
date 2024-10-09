import { LoginRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class LoginDto implements LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}