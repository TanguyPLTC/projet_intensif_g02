import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IBuilding } from '../interfaces/building.interface';

@Entity()
export class Building implements IBuilding {
  @PrimaryGeneratedColumn()
  public idBuilding: number;

  @Column()
  public adress: string;

  @Column()
  public postalCode: string;

  @Column()
  public city: string;

  @Column()
  public latitude: string;

  @Column()
  public longitude: string;

  @Column()
  public availablePlace: number;
}
