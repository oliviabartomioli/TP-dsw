import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request')
export class request {
  @PrimaryGeneratedColumn()
  idRequest!: number;
}
