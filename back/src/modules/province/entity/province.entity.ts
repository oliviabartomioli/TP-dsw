import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('province')
export class province {
  @PrimaryGeneratedColumn()
  idProvince!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameProvince!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteProvince?: boolean;
}
