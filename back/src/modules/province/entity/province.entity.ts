import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { city } from '../../city/entity/city.entity';

@Entity('province')
export class province {
  @PrimaryGeneratedColumn()
  idProvince!: number;

  @Column({ type: String, nullable: false, length: 30 })
  nameProvince!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteProvince?: boolean;

  @OneToMany(() => city, (city) => city.province)
  cities!: city[];
}
