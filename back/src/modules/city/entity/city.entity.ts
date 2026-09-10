import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class city {
  @PrimaryGeneratedColumn()
  idCity!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameCity!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteCity?: boolean;
}
