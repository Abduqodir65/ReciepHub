import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Get('/about')
    @Render('about')
    about() {
        return { info: 'This is the about page.' };
    }

    @Get('/contact')
    @Render('contact') 
    contact() {
        return { contactInfo: 'You can contact us at example@example.com.' };
    }

}