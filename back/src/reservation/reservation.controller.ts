import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all reservation',
    operationId: 'getAllReservation',
  })
  public async getAllReservation(@Res() res: Response) {
    const reservations = await this.reservationService.findAll();
    return res.status(HttpStatus.OK).json(reservations);
  }

  @Get('/enterprise/:enterpriseId')
  @ApiOperation({
    summary: 'Get all reservation by enterprise Id',
    operationId: 'getAllReservationByEnterpriseId',
  })
  public async getAllReservationByEnterpriseId(
    @Param('enterpriseId') enterpriseId: number,
    @Res() res: Response,
  ) {
    if (Number.isNaN(+enterpriseId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({});
    }

    const reservations = await this.reservationService.findAllByEnterpriseId(
      enterpriseId,
    );
    return res.status(HttpStatus.OK).json(reservations);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create as a new reservation',
    operationId: 'createReservatione',
  })
  public async create(
    @Res() res: Response,
    @Body() reservationDto: CreateReservationDto,
  ) {
    const reservation = await this.reservationService.create(reservationDto);

    return res.status(HttpStatus.CREATED).json(reservation);
  }

  @Delete('/:reservationId')
  @ApiOperation({
    summary: 'Delete a reservation',
    operationId: 'deleteReservation',
  })
  public async delete(
    @Param('reservationId') reservationId: number,
    @Res() res: Response,
  ) {
    const reservation = await this.reservationService.deleteById(reservationId);

    return res.status(HttpStatus.OK).json(reservation);
  }
}
