import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class city {
  @PrimaryGeneratedColumn()
  idCity!: number;
}
