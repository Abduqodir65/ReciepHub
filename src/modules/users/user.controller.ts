import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.#_service.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.#_service.getUserById(Number(id));
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() createUserPaload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ message: string; new_user: CreateUserDto }> {
    await this.#_service.createUser(createUserPaload, image);

    return {
      message: 'User created successfully',
      new_user: createUserPaload,
    };
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserPayload: UpdateUserDto,
  ): Promise<{ message: string; updatedUser: UpdateUserDto }> {
    await this.#_service.updateUser(Number(id), updateUserPayload);

    return {
      message: 'User updated successfully',
      updatedUser: updateUserPayload,
    };
  }

  @Delete('delete/:id')
  async delteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_service.deleteUser(+id);
  }
}
