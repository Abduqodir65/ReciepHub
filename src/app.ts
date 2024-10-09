import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig, multerConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Category, CategoryModule, FileModule, Reciep, ReciepModule, User, UserModule } from 'modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from 'client';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig,jwtConfig],
    }),

    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15
      }
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [User,Category,Reciep],
            synchronize: true,
            // sync: { force: true },
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    TelegrafModule.forRoot({
      token:"7927180591:AAEvYKVXVEJBCcFl-n7lbcVasiM0q65XLds"
    }),
    UserModule,
    CategoryModule,
    ReciepModule,
    FileModule,
    BotModule
  ],
  // providers: [{
  //   useClass: CheckAuthGuard,
  //   provide:APP_GUARD
  // }]

})
export class AppModule {}

