import { IsNumberString, IsString } from 'class-validator';
import { CreateReciepRequest } from '../interfaces';

export class UpdateReciepDto implements Omit<CreateReciepRequest, 'image'> {
  @IsString()
  quantity: string;

  @IsNumberString()
  product_id: number;

  @IsNumberString()
  meal_id: number;
}
