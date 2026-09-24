import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn()
  idfav!: number;

  @Column({ type: Date, nullable: false })
  date!: Date;

  @Column({ type: Number, nullable: false })
  fiveStarAmount!: number;

  @Column({ type: String, nullable: false, length: 150 })
  comment!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteFav?: boolean;
}
