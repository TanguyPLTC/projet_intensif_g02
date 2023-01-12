import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class FindAvailableBuildingDto {
  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsDate()
  dateStart: Date;

  @ApiProperty()
  @IsDate()
  dateEnd: Date;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  needPlace: number;
}

export class AvailableBuildingDto extends OmitType(FindAvailableBuildingDto, [
  'city',
] as const) {}
