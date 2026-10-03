import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { province } from '../../province/entity/province.entity';
import { Professional } from '../../professional/entity/professional.entity';

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

  @OneToMany(() => Professional, (professional) => professional.city)
  professionals!: Professional[];
}
