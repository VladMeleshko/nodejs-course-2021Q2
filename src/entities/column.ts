import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Columns' })
export class Columns {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;
}
