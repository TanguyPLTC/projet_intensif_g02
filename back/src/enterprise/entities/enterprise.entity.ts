import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IEnterprise } from '../interfaces/enterprise.interface';

@Entity()
export class Enterprise implements IEnterprise {
  @PrimaryGeneratedColumn()
  public idEnterprise: number;

  @Column()
  public name: string;
}
