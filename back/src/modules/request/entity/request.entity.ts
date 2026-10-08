import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Services } from 'src/modules/services/entity/services.entity';

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

  @ManyToOne(() => User, (user) => user.requests, {
    nullable: false,
  })
  @JoinColumn({ name: 'dniUs' })
  user!: User;

  @ManyToOne(() => Services, {
    nullable: true,
  })
  @JoinColumn({ name: 'idService' })
  service?: Services;
}
