import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entity/user.entity';
import { Professional } from '../../professional/entity/professional.entity';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn()
  idfav!: number;

  @Column({ type: Date, nullable: false })
  date!: Date;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteFav?: boolean;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'dniUs' })
  user!: User;

  @ManyToOne(() => Professional, (professional) => professional.favorites)
  @JoinColumn({ name: 'dniP' })
  professional!: Professional;
}
