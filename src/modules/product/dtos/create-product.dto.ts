import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CreateProductRequest } from '../interfaces';

export class CreateProductDto implements Omit<CreateProductDto, 'image'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  image: any;
}
