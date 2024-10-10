import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserRequest } from '../interfaces';

export class CreateUserDto implements Omit<CreateUserRequest, 'image'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  image: any;
}
