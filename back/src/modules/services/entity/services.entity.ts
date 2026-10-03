import { category } from 'src/modules/category/entity/category.entity';
import { Professional } from 'src/modules/professional/entity/professional.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => category, (category) => category.services, {
    nullable: false,
  })
  @JoinColumn({ name: 'idCategory' })
  category!: category;

  @ManyToOne(() => Professional, (professional) => professional.services)
  @JoinColumn({ name: 'dniP' })
  professional!: Professional;
}
