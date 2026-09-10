import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review')
export class review {
  @PrimaryGeneratedColumn()
  idReview!: number;

  @Column({ type: String, nullable: false, length: 60 })
  commentR!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteR?: boolean;
}
