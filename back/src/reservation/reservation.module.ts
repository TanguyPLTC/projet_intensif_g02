import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuildingService } from '../building/building.service';
import { Building } from '../building/entities/building.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Enterprise, Building])],
  controllers: [ReservationController],
  providers: [ReservationService, BuildingService],
})
export class ReservationModule {}
