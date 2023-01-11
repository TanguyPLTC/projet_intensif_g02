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
    // TODO
    return [];
  }
}
