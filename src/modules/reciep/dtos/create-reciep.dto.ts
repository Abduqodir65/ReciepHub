import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { CreateReciepRequest } from '../interfaces';

export class CreateReciepDto implements Omit<CreateReciepRequest, 'image'> {
  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  meal_id: number;
}
