import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IBuilding } from '../interfaces/building.interface';

@Entity()
export class Building implements IBuilding {
  @PrimaryGeneratedColumn()
  public idBuilding: number;

  @Column()
  public location: string;

  @Column()
  public place: number;
}
