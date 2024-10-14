import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, RefreshResponse, RegisterResponse } from './interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, RefreshDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  #_service: AuthService;

  constructor(service: AuthService) {
    this.#_service = service;
  }

  @ApiOperation({ summary: 'Login qilish' })
  @Post('/login')
  async signIn(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.#_service.login(payload);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(@Body() payload: RegisterDto,@UploadedFile() image: Express.Multer.File,): Promise<RegisterResponse> {
    return await this.#_service.register(payload,image);
  }
}
