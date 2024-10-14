import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Get('/about')
    @Render('about.ejs')
    about() {
        return { info: 'This is the about page.' };
    }

    @Get('/contact')
    @Render('contact.ejs') 
    contact() {
        return { contactInfo: 'You can contact us at example@example.com.' };
    }

    @Get('/elements')
    @Render('elements.ejs')
    element() {
        return { info: 'this is the login page'}
    }

    @Get('/blogpost')
    @Render('blogpost.ejs')
    blog_post() {
        return { info: 'this is the login page'}
    }
    @Get('/receipepost')
    @Render('reciepepost.ejs')
    resieppost() {
        return { info: 'this is the login page'}    
    }

    @Get('/login')
    @Render('login.ejs')
    login() {
        return { info: 'this is the login page'}
    }

}