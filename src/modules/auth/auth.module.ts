import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { FileModule} from 'modules/file';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule.register({}),FileModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
