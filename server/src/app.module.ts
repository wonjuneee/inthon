import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';
import { TypeormConfig } from './config/typeorm.config';
import { ImagesController } from './image/image.controller';
import { ImagesModule } from './image/image.module';
import { ImageService } from './image/image.service';
import { PerformanceModule } from './performance/performance.module';
import { PerformanceController } from './performance/performance.controller';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (config: ConfigType<typeof dbConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [__dirname + '/*/*.entity{.ts,.js}'],
        synchronize: config.env === 'production' ? false : true,
        logging: true,
      }),
    }),
    AuthModule,
    UserModule,
    AwsModule,
    ImagesModule,
    PerformanceModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ImagesController,
    PerformanceController,
  ],
  providers: [AppService, AuthService, ImageService],
})
export class AppModule {}
