import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { AvailableBuildingDto } from 'src/building/dto/available-building';

export class CreateReservationDto extends AvailableBuildingDto {
  @ApiProperty()
  @IsNumber()
  idEnterprise: number;

  @ApiProperty()
  @IsNumber()
  idBuilding: number;
}
