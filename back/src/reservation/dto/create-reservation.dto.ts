import { IsNumber } from 'class-validator';
import { AvailableBuildingDto } from 'src/building/dto/available-building';

export class CreateReservationDto extends AvailableBuildingDto {
  @IsNumber()
  idEnterprise: number;

  @IsNumber()
  idBuilding: number;
}
