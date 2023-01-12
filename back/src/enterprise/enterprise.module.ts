import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './entities/enterprise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise])],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
