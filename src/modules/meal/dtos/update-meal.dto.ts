import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CreateMealRequest } from '../interfaces';

export class UpdateMealDto implements Omit<CreateMealRequest, 'image'> {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  video: string;

  @IsNumberString()
  category_id: number;

  @IsNumberString()
  user_id: number;
}
