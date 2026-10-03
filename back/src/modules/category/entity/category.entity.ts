import { Services } from 'src/modules/services/entity/services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Services, (service) => service.category)
  services!: Services[];
}
