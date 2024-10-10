import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CreateMealRequest } from '../interfaces';

export class CreateMealDto implements Omit<CreateMealRequest, 'image'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  video: string;

  @IsNumberString()
  @IsNotEmpty()
  category_id: number;

  @IsNumberString()
  @IsNotEmpty()
  user_id: number;
}
