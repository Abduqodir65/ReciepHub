import * as bcrypt from 'bcrypt';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './interfaces';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'modules/users';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FileService } from 'modules/file';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private usermodel: typeof User,
    private config: ConfigService,
    private jwt: JwtService,
    private readonly fileService: FileService
    
  ) {}

  async register(payload: RegisterRequest,file: Express.Multer.File,): Promise<RegisterResponse> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const image = await this.fileService.uploadFile(file);

    const newUser = await this.usermodel.create({
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      image 
    });

    const accessToken = await this.jwt.signAsync(
      { id: newUser.id },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { id: newUser.id },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    return {
      message: 'successfully registered',
      accessToken,
      refreshToken,
    };
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const foundedUser = await this.usermodel.findOne({
      where: { email: payload.email },
    });

    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }

    // Parolni solishtirish
    const isPasswordValid = await bcrypt.compare(
      payload.password,
      foundedUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const accessToken = await this.jwt.signAsync(
      { id: foundedUser.id },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { id: foundedUser.id },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    return {
      message: 'successfully logged in',
      accessToken,
      refreshToken,
    };
  }
}
