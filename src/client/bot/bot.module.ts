import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "modules";

@Module({
    imports: [SequelizeModule.forFeature([Category])],
    providers: [BotService],
})
export class BotModule {}   