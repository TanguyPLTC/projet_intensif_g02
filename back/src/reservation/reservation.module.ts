import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/building/entities/building.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';

import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Enterprise, Building])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
