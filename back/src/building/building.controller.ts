import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all building',
    operationId: 'getAllBuilding',
  })
  public async getAllBuilding(@Res() res: Response) {
    const buildings = await this.buildingService.findAll();
    return res.status(HttpStatus.OK).json(buildings);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create as a new building',
    operationId: 'createBuilding',
  })
  public async create(
    @Res() res: Response,
    @Body() buildingDto: CreateBuildingDto,
  ) {
    const building = await this.buildingService.create(buildingDto);

    return res.status(HttpStatus.CREATED).json(building);
  }
}
