import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  adress: string;

  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  latitude: number;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  maxPlace: number;
}
