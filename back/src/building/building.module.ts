import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from '../reservation/entities/reservation.entity';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building } from './entities/building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Reservation])],
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingModule {}
