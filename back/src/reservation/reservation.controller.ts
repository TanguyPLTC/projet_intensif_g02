import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
}
