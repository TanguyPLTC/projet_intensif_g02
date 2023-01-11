import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppConfigModule } from './config.module';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),
  ],
})
export class AppThrottlerModule {}
