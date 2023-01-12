import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  name: string;
}
