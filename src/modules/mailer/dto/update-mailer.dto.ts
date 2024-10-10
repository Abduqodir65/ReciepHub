import { PartialType } from '@nestjs/mapped-types';
import { CreateMailerDto } from './create-mailer.dto';

export class UpdateMailerDto extends PartialType(CreateMailerDto) {}
