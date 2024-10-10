import { LoginRequest } from '../interfaces';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto implements LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
