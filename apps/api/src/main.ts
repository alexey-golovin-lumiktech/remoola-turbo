import { ValidationPipe } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { default as cookieParser } from 'cookie-parser';
import * as express from 'express';

import { AppModule } from './app.module';
import { TransformResponseInterceptor, validationPipeOpts } from './common';
import { GlobalExceptionFilter } from './common/filters';

async function bootstrap() {
  const host = { unset: `[::1]`, local: `localhost`, ip: `127.0.0.1` };
  const port = { consumer: 3000, backend: 3333, admin: 3010 };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.set(`query parser`, `extended`);
  app.setGlobalPrefix(`api`);
  app.use(express.json({ limit: `25mb` }));
  app.use(express.urlencoded({ extended: true, limit: `25mb` }));
  app.use(cookieParser(process.env.SECURE_SESSION_SECRET));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      skipUndefinedProperties: true,
      transformerPackage: {
        classToPlain: instanceToPlain,
        plainToInstance: plainToInstance,
      },
      transformOptions: {
        enableImplicitConversion: true,
        exposeUnsetFields: false,
        excludeExtraneousValues: true,
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe(validationPipeOpts));

  const config = new DocumentBuilder()
    .setTitle(`Remoola API`)
    .setDescription(`Client dashboard API`)
    .setVersion(`1.0.0`)
    .addBearerAuth({ type: `http`, scheme: `bearer`, bearerFormat: `JWT` }, `jwt`)
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`docs`, app, doc);
  const handler: RequestHandler = (_req, res) => res.send(doc);
  app.getHttpAdapter().get(`/api-json`, handler);

  await app
    .listen(process.env.PORT ?? port.backend, process.env.HOST ?? host.ip)
    .then(() => (console.log(``), app.getUrl()))
    .then((appUrl) => console.debug(`Application is running on:: "${appUrl}"`));
}
bootstrap();
