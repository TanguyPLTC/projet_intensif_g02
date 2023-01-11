import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEnterpriseDto {
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  name: string;
}
