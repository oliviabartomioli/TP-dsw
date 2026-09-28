import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { province } from '../../province/entity/province.entity';

@Entity('city')
export class city {
  @PrimaryGeneratedColumn()
  idCity!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameCity!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteCity?: boolean;

  @ManyToOne(() => province, (province) => province.cities, {
    nullable: false,
  })
  @JoinColumn({ name: 'idProvince' })
  province!: province;
}
