import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Building } from '../../building/entities/building.entity';
import { IReservation } from '../interfaces/reservation.interface';

@Entity()
export class Reservation implements IReservation {
  @PrimaryGeneratedColumn()
  public idReservation: number;

  @Column({ type: 'datetime' })
  public dateStart: Date;

  @Column({ type: 'datetime' })
  public dateEnd: Date;

  @Column()
  public place: number;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.idEnterprise, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  public enterprise: Relation<Enterprise>;

  @ManyToOne(() => Building, (building) => building.idBuilding, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  public building: Relation<Building>;
}
