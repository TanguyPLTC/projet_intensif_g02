import { Module } from '@nestjs/common';

import { SQliteDatabaseProviderModule } from '../db.module';
import { BuildingSeederModule } from './building/building.module';
import { EnterpriseSeederModule } from './enterprise/enterprise.module';
import { Seeder } from './seeder';

@Module({
  imports: [
    SQliteDatabaseProviderModule,
    EnterpriseSeederModule,
    BuildingSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
