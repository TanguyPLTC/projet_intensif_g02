import { Module } from '@nestjs/common';

import { BuildingModule } from './building/building.module';
import { SQliteDatabaseProviderModule } from './database/db.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppThrottlerModule } from './utils/modules/throttler.module';

@Module({
  imports: [
    AppThrottlerModule,
    SQliteDatabaseProviderModule,
    BuildingModule,
    EnterpriseModule,
    ReservationModule,
  ],
})
export class AppModule {}
