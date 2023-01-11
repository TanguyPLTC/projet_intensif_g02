import { Module } from '@nestjs/common';

import { SQliteDatabaseProviderModule } from '../db.module';
import { EnterpriseSeederModule } from './enterprise/enterprise.module';
import { Seeder } from './seeder';

@Module({
  imports: [SQliteDatabaseProviderModule, EnterpriseSeederModule],
  providers: [Seeder],
})
export class SeederModule {}
