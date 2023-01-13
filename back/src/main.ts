import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const NODE_ENV = configService.get<string>('NODE_ENV');

  app.enableCors(); // TODO config CORS
  app.useLogger(new Logger(NODE_ENV === 'dev' ? 'debug' : 'warn'));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
  Logger.log(`Url for OpenApi: ${await app.getUrl()}/docs`, 'Swagger');
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Intensif02')
    .setDescription('Intensif02 API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}

bootstrap();
