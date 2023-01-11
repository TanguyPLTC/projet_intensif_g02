import { Module } from '@nestjs/common';

import { BuildingModule } from './building/building.module';
import { PostgresDatabaseProviderModule } from './database/db.module';
import { AppThrottlerModule } from './utils/modules/throttler.module';

@Module({
  imports: [AppThrottlerModule, PostgresDatabaseProviderModule, BuildingModule],
})
export class AppModule {}
