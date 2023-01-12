import { IsDate, IsNumber, IsString } from 'class-validator';

export class AvailableBuildingDto {
  @IsDate()
  dateStart: Date;

  @IsDate()
  dateEnd: Date;

  @IsNumber()
  needPlace: number;
}

export class FindAvailableBuildingDto extends AvailableBuildingDto {
  @IsString()
  city: string;
}
