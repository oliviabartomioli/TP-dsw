import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class category {
  @PrimaryGeneratedColumn()
  idCategory!: number;

  @Column({ type: String, nullable: false, length: 30 })
  nameC!: string;

  @Column({ type: String, nullable: false, length: 150 })
  descriptionC!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteC?: boolean;
}
