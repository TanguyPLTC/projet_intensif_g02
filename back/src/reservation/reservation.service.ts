import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BuildingService } from '../building/building.service';
import { Building } from '../building/entities/building.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    private readonly buildingService: BuildingService,
  ) {}

  public async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  public async create(
    reservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { idEnterprise: reservationDto.idEnterprise },
    });
    const building = await this.buildingRepository.findOne({
      where: { idBuilding: reservationDto.idBuilding },
    });

    if (!enterprise || !building) {
      throw new NotFoundException("Enterprise or building doesn't exist");
    }

    const available = await this.buildingService.isBuildingAvailable(
      reservationDto,
      building,
    );
    if (!available) {
      throw new ConflictException('Building is not available');
    }

    const reservation = new Reservation();
    reservation.dateStart = reservationDto.dateStart;
    reservation.dateEnd = reservationDto.dateEnd;
    reservation.place = reservationDto.needPlace;
    reservation.enterprise = enterprise;
    reservation.building = building;

    return await this.reservationRepository.save(reservation);
  }
}
