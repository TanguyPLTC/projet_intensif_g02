import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Building } from '../../building/entities/building.entity';
import { IReservation } from '../interfaces/reservation.interface';

@Entity()
export class Reservation implements IReservation {
  @PrimaryGeneratedColumn()
  public idReservation: number;

  @Column()
  public hourStart: number;

  @Column()
  public hourEnd: number;

  @Column()
  public place: number;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.idEnterprise, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  public enterprise: Relation<Enterprise>;

  @ManyToOne(() => Building, (building) => building.idBuilding, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  public building: Relation<Building>;
}
