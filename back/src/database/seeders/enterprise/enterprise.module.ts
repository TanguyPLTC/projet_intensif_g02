import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';

import { EnterpriseSeederService } from './enterprise.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise])],
  providers: [EnterpriseSeederService],
  exports: [EnterpriseSeederService],
})
export class EnterpriseSeederModule {}
