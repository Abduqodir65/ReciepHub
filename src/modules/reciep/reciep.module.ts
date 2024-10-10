import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reciep } from './models';
import { ReciepService } from './reciep.service';
import { ReciepController } from './reciep.controller';

@Module({
  imports: [SequelizeModule.forFeature([Reciep])],
  providers: [ReciepService],
  controllers: [ReciepController],
})
export class ReciepModule {}
