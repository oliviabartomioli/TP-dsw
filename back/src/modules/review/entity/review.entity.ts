import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { request } from '../../request/entity/request.entity';

@Entity('review')
export class review {
  @PrimaryGeneratedColumn()
  idReview!: number;

  @Column({ type: String, nullable: false, length: 60 })
  commentR!: string;

  @Column({ type: Number, nullable: false })
  rating!: number;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteR?: boolean;

  @ManyToOne(() => request, { nullable: true })
  @JoinColumn({ name: 'idRequest' })
  request?: request;
}
