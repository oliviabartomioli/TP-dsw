import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request')
export class request {
  @PrimaryGeneratedColumn()
  idRequest!: number;

  @Column({ type: Date, nullable: false })
  date!: Date;

  @Column({ type: String, nullable: false, length: 15 })
  state!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteRequest?: boolean;
}
