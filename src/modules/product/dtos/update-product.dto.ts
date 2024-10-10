import { IsNumberString, IsString } from 'class-validator';
import { CreateProductRequest } from '../interfaces';

export class UpdateProductDto implements Omit<CreateProductRequest, 'image'> {
  @IsString()
  name: string;

  image: any;
}
