import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger: Logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
    cors: true,
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    optionsSuccessStatus: 200,
  });

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600000 },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.get('PORT') | 3000);

  logger.log(
    `Application is running on: ${await app.getUrl()}}, ${configService.get('PORT')}`
  );
}

bootstrap();
