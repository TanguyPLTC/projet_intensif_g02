import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBuildingDto } from './dto/create-building';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  public async findAll(): Promise<Building[]> {
    return await this.buildingRepository.find();
  }

  public async create(buildingDto: CreateBuildingDto): Promise<Building> {
    return await this.buildingRepository.save(buildingDto);
  }
}
