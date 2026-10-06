import { Favorite } from 'src/modules/favorite/entity/favorite.entity';
import { request } from '../../request/entity/request.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @Column({ type: String, nullable: false, length: 100 })
  passwordU!: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleteU?: boolean;

  @OneToMany(() => request, (request) => request.user)
  requests!: request[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];
}
