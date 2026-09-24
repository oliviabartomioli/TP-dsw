import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Professional } from '../../professional/entity/professional.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn()
  idAvailability!: number;

  @Column({ type: 'enum', enum: DayOfWeek, nullable: false })
  dayOfWeek!: DayOfWeek;

  @Column({ type: 'time', nullable: false })
  startTime!: string; // 'HH:mm:ss'

  @Column({ type: 'time', nullable: false })
  endTime!: string; // 'HH:mm:ss'

  @Column({ type: 'boolean', nullable: false, default: false })
  deleteAv!: boolean;

  @ManyToOne(
    () => Professional,
    (professional) => professional.availabilities,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'dniP' })
  professional!: Professional;
}
