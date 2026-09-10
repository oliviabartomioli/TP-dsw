import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Services {
  @PrimaryGeneratedColumn()
  idService!: number;

  @Column({ type: String, nullable: false, length: 30 })
  nameS!: string;

  @Column({ type: String, nullable: false, length: 150 })
  descriptionS!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteS?: boolean;
}
