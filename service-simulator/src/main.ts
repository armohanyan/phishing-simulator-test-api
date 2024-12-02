import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {TcpOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "./common/config/config.service";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const APP_PORT = new ConfigService().get('port')
  const HOST = new ConfigService().get('host')

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: APP_PORT,
    },
  } as TcpOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  console.log(`🚀 Service SIMULATOR running at http://${HOST}:${APP_PORT}`);
}
bootstrap();
