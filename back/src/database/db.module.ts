import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/utils/modules/config.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: 'database.db',
        synchronize: true,
        entities: [config.get<string>('TYPEORM_ENTITIES')],
        migrations: [config.get<string>('TYPEORM_MIGRATIONS')],
        subscribers: [config.get<string>('TYPEORM_SUBSCRIBERS')],
        cli: {
          migrationsDir: 'src/migrations',
          subscribersDir: 'src/subscriber',
        },
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
