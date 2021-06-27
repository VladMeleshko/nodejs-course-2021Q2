import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Columns } from './column';

@Entity({ name: 'Boards' })
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('simple-json')
  columns!: Columns[];
}
