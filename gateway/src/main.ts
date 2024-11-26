import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/config/config.service';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as compression from 'compression';
import {setupSwagger} from "./common/config/swagger.config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    },
    logger: ['error', 'warn', 'debug', 'log'],
  });

  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());

  const APP_PORT = new ConfigService().get('port');

  await app.listen(APP_PORT, () => {
    console.log(`🚀 Application running at port ${APP_PORT}`);
  });
}

bootstrap();
