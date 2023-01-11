import { NestFactory } from '@nestjs/core';

import { Seeder } from './database/seeders/seeder';
import { SeederModule } from './database/seeders/seeder.module';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = app.get<Seeder>(Seeder);

  await seeder.seed();
  app.close();
}
bootstrap();
