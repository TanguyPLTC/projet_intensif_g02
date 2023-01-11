import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Building } from '../../building/entities/building.entity';
import { IReservation } from '../interfaces/reservation.interface';

@Entity()
export class Reservation implements IReservation {
  @PrimaryGeneratedColumn()
  public idReservation: number;

  @ManyToOne(() => Enterprise, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  // @JoinColumn({
  //   name: 'idEnterprise',
  // })
  public enterprise?: Relation<Enterprise>;

  @ManyToOne(() => Building, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  // @JoinColumn({
  //   name: 'idBuilding',
  // })
  public building?: Relation<Building>;
}
