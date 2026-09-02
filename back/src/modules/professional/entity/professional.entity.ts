import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('professional')
export class Professional {
  @PrimaryColumn()
  dniP!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  surnameP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  typeP!: string;

  @Column({ type: String, nullable: false, length: 15 })
  assessmentP!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteP?: boolean;
}
