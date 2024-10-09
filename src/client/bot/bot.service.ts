import { Category } from 'modules';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';


@Injectable()
@Update()
export class BotService {
    constructor(@InjectModel(Category) private categoryModel: typeof Category) { }
    @Action('start')
    @Start()
    async startBot(@Ctx() context: Context) {
        const imagepath = path.join(
            __dirname,
            '../../../',
            'public',
            'images',
            'restaurant.jpg',
        );
        await context.replyWithPhoto(
            { source: createReadStream(imagepath) },
            {
                caption: 'Feane restorani',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { callback_data: 'start', text: 'Start command' },
                            { callback_data: 'help', text: 'Help command' },
                        ],
                        [{ callback_data: 'categories', text: 'Taom turlari' }],
                    ],
                    resize_keyboard: true,
                    // keyboard: [
                    //     [{text: "Phone", request_contact: true}, {text: "Location", request_location: true}]
                    // ],
                    one_time_keyboard: true,
                },
            },
        );
    }

    @Action('help')
    @Command('help')
    async helpCommand(@Ctx() context: Context): Promise<void> {
        context.replyWithHTML(`<b>Botdagi komandalar:</b>
        <i>start - botni qayta ishga tushirish</i>
        <i>help - botdagi komandalarni ko'rish</i>
        `);
    }


    @Action('categories')
    async showCategories(@Ctx() context: Context): Promise<void> {
        const allCategories = await this.categoryModel.findAll();

        let categoriesBtns: { callback_data: string; text: string }[][] = [];

        for (const ct of allCategories) {
            categoriesBtns.push([
                {
                    callback_data: `${ct.id}-${ct.name}`,
                    text: ct.name,
                },
            ]);
        }

        const imagepath = path.join(
            __dirname,
            '../../../',
            'public',
            'images',
            'categories.jpg',
        );

        await context.replyWithPhoto(
            {
                source: createReadStream(imagepath)
            },
            { reply_markup: { inline_keyboard: categoriesBtns, one_time_keyboard: true } },
        );
    }
}