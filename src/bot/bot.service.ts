import { Injectable } from '@nestjs/common';
import { InjectBot, Start } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
    constructor(@InjectBot() private bot: Telegraf<Context>) {}

    @Start()
    async onStart(ctx: Context) {
      try {
        await ctx.reply('Assalomu alekum bratim', {
          reply_markup: {
            keyboard: [
              [{ text: `Ro'yxatdan o'tish` }]
            ],
            resize_keyboard: true
          }
        });
      } catch (error) {
        console.log(`Error on start: ${error}`);
        ctx.reply('Something went wrong'); 
      }
    }

    async onRegister(ctx:Context) {
      try {
        ctx.reply(`Kim sifatida ro'yxatdan o'rmotchisiz 🤭`, {
          reply_markup: {
            keyboard: [
              [{text: 'Usta'} , {text: 'Mijoz'}]
            ],
            resize_keyboard: true,
            one_time_keyboard:true
          }
        })
      } catch (error) {
        console.log(`Error on start: ${error}`)
        ctx.reply('Something went wrong')
      }
    }

    async onUsta(ctx:Context) {
      const services = [
        {
          id: 1,
          name: "Sartaroshxona"
        },
        {
          id: 2,
          name:"zargarlik ustaxonasi"
        },
        {
          id: 3,
          name:"Elekt ustasi"
        },
        {
          id: 4,
          name:"Soatsoz"
        }
      ] 

      const inline_keyboard = []

      services.forEach(service => {
        inline_keyboard.push(
          [{ text: service.name,callback_data: `service_${service.id}` }]
        )
      })

      try {
        ctx.reply('Xizmatlardan birini tanlang 😏', {
          reply_markup: {
            inline_keyboard
          }
        })
      } catch (error) {
        console.log(`Error on start: ${error}`)
        ctx.reply('Something went wrong')
      }
    }

    async onMijoz(ctx:Context) {
      ctx.reply('Mijoz')
    }
}
