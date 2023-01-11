import { IsDate, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  dateStart: Date;

  @IsDate()
  dateEnd: Date;

  @IsNumber()
  place: number;

  @IsNumber()
  idEnterprise: number;

  @IsNumber()
  idBuilding: number;
}
