import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/building/entities/building.entity';

import { BuildingSeederService } from './building.service';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingSeederService],
  exports: [BuildingSeederService],
})
export class BuildingSeederModule {}
