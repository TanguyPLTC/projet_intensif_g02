import { IsDate, IsNumber, IsString } from 'class-validator';

export class AvailableBuildingDto {
  @IsString()
  city: string;

  @IsDate()
  dateStart: Date;

  @IsDate()
  dateEnd: Date;

  @IsNumber()
  needPlace: number;
}
