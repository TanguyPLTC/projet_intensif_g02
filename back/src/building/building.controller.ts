import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  @Get('/')
  @ApiOperation({
    summary: 'Get all building',
    operationId: 'getAllBuilding',
  })
  public async getAllWord(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }
}
