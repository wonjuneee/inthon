import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';
import { TypeormConfig } from './config/typeorm.config';
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
      useFactory: TypeormConfig,
    }),
    AuthModule,
    UserModule,
    AwsModule,
    PerformanceModule,
  ],
  controllers: [AppController, AuthController, PerformanceController],
  providers: [AppService, AuthService],
})
export class AppModule {}
