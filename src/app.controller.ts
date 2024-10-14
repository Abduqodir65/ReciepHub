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

    @Get('/elements')
    @Render('elements')
    element() {
        return { info: 'this is the login page'}
    }

    @Get('/blogpost')
    @Render('blog-post')
    blog_post() {
        return { info: 'this is the login page'}
    }
    @Get('/receipepost')
    @Render('reciepe-post')
    resiep_post() {
        return { info: 'this is the login page'}    
    }

    @Get('/login')
    @Render('login')
    login() {
        return { info: 'this is the login page'}
    }

}