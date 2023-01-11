import { Injectable } from '@nestjs/common';

import { IBuilding } from './interfaces/building.interface';

@Injectable()
export class BuildingService {
  buildingList: IBuilding[] = [];
}
