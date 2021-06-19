import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColumnsModel } from '../resources/boards/board.model';

@Entity({ name: 'Boards' })
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('simple-json')
  columns!: ColumnsModel[];
}
