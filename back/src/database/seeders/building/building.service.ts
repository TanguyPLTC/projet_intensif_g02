import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/building/entities/building.entity';
import { IBuilding } from 'src/building/interfaces/building.interface';
import { Repository } from 'typeorm';

import { datas } from './data';

@Injectable()
export class BuildingSeederService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  async create(): Promise<IBuilding[]> {
    const changed: IBuilding[] = [];

    for (const data of datas) {
      const dbEnterprise = await this.buildingRepository.findOneBy({
        adress: data.adress,
        postalCode: data.postalCode,
        city: data.city,
        maxPlace: data.maxPlace,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      if (!dbEnterprise) {
        changed.push(await this.buildingRepository.save(data));
      }
    }

    return changed;
  }
}
