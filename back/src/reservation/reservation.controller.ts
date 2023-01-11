import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  @Get('/')
  @ApiOperation({
    summary: 'Get all reservation',
    operationId: 'getAllReservation',
  })
  public async getAllReservation(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }
}
