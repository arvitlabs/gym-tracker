import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ApiResponseInterceptor,
  ApiErrorFilter,
} from './shared/http/api-response';
import { AppModule } from './app.module';

import { configureSessionSigning } from './features/account/helpers/account-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureSessionSigning();
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ApiErrorFilter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = Number(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
