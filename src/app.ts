import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Category, CategoryModule, FileModule, Reciep, ReciepModule, User, UserModule } from 'modules';


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
    UserModule,
    CategoryModule,
    ReciepModule,
    FileModule
  ],
  // providers: [{
  //   useClass: CheckAuthGuard,
  //   provide:APP_GUARD
  // }]

})
export class AppModule {}

