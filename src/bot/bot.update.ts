import { Ctx, Hears, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
    constructor(private readonly botService:BotService) { }

    @Start()
    async onStart(@Ctx() ctx:Context){
        return this.botService.onStart(ctx)
    }

    @Hears(`Ro'yxatdan o'tish`)
    async onRegister(@Ctx() ctx:Context) {
        return this.botService.onRegister(ctx)
    }

    @Hears('Usta')
    async onUsta(@Ctx() ctx:Context) {
        return this.botService.onUsta(ctx)
    }

    @Hears('Mijoz')
    async onMijoz(@Ctx() ctx:Context) {
        return this.botService.onMijoz(ctx)
    }

}