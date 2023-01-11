import { IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  hourStart: number;

  @IsNumber()
  hourEnd: number;

  @IsNumber()
  place: number;

  @IsNumber()
  idEnterprise: number;

  @IsNumber()
  idBuilding: number;
}
