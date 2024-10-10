import { IsInt, IsString } from 'class-validator';
import { CreateUserRequest } from '../interfaces';

export class UpdateUserDto implements Omit<CreateUserRequest, 'image'> {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsInt()
  age: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  image: any;
}
