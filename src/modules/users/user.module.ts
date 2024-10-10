import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { FileModule } from '../file';
// import { MeService } from "./me.service";
// import { MeController } from "./me.controller";

@Module({
  imports: [SequelizeModule.forFeature([User]), FileModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
