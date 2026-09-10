import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  dniUs!: number;

  @Column({ type: String, nullable: false, length: 15 })
  nameU!: string;

  @Column({ type: String, nullable: false, length: 15 })
  surnameU!: string;

  @Column({ type: String, nullable: false, length: 15 })
  phoneU!: string;

  @Column({ type: String, nullable: false, length: 30 })
  emailU!: string;

  @Column({ type: String, nullable: false, length: 15 })
  passwordU!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteU?: boolean;
}
