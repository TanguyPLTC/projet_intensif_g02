import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  public latitude: number;

  @Column()
  public longitude: number;

  @Column()
  public maxPlace: number;

  @OneToMany(() => Reservation, (reservation) => reservation.idReservation, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  public reservations: Reservation[];
}
