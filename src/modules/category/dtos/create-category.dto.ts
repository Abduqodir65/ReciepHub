import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryRequest } from '../interfaces';

export class CreateCategoryDto implements Omit<CreateCategoryRequest, 'image'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  image: any;
}
