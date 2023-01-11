import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from '../reservation/entities/reservation.entity';
import { AvailableBuildingDto } from './dto/available-building';
import { CreateBuildingDto } from './dto/create-building';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  public async findAll(): Promise<Building[]> {
    return await this.buildingRepository.find();
  }

  public async create(buildingDto: CreateBuildingDto): Promise<Building> {
    return await this.buildingRepository.save(buildingDto);
  }

  public async findAvailableBuilding(
    availableBuildingDto: AvailableBuildingDto,
  ): Promise<Building[]> {
    const buildings = await this.buildingRepository.findBy({
      city: availableBuildingDto.city,
    });

    const availableBuilding = [];
    for await (const building of buildings) {
      const usePlace = await this.getUsePlaceBuilding(
        availableBuildingDto,
        building,
      );
      if (usePlace + availableBuildingDto.needPlace <= building.maxPlace) {
        availableBuilding.push({ ...building, usePlace: usePlace });
      }
    }

    return availableBuilding;
  }

  // TODO CHECK SI PAS ALGO BUGUE
  public async getUsePlaceBuilding(
    availableBuildingDto: AvailableBuildingDto,
    building: Building,
  ): Promise<number> {
    const askStart = availableBuildingDto.dateStart;
    const askEnd = availableBuildingDto.dateEnd;

    const reservations = await this.reservationRepository.find({
      where: {
        building: {
          idBuilding: building.idBuilding,
        },
      },
    });

    const reservationsInDate = reservations.filter((reservation) => {
      const resStart = reservation.dateStart;
      const resEnd = reservation.dateEnd;
      return (
        (resStart >= askStart && resEnd <= askEnd) ||
        (resStart <= askStart && resEnd >= askEnd) ||
        (resEnd >= askStart && resEnd <= askEnd) ||
        (resStart >= askStart && resStart <= askEnd)
      );
    });

    const usePlace = reservationsInDate.reduce(
      (use, reservation) => use + reservation.place,
      0,
    );

    return usePlace;
  }
}
