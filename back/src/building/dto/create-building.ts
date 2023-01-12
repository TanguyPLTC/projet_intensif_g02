import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  adress: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  latitude: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  longitude: string;

  @ApiProperty()
  @IsNumber()
  maxPlace: number;
}
