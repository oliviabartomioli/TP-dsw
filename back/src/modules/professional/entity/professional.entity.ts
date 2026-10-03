import { Availability } from 'src/modules/availability/entity/availability.entity';
import { city } from 'src/modules/city/entity/city.entity';
import { Favorite } from 'src/modules/favorite/entity/favorite.entity';
import { Services } from 'src/modules/services/entity/services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('professional')
export class Professional {
  @PrimaryColumn()
  dniP!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  surnameP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  typeP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  assessmentP!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteP?: boolean;

  @OneToMany(() => Availability, (availability) => availability.professional)
  availabilities!: Availability[];

  @OneToMany(() => Services, (service) => service.professional)
  services!: Services[];

  @OneToMany(() => Favorite, (favorite) => favorite.professional)
  favorites!: Favorite[];

  @ManyToOne(() => city, (city) => city.professionals, {
    nullable: false,
  })
  @JoinColumn({ name: 'idCity' })
  city!: city;
}
