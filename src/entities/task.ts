import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Tasks' })
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ nullable: true })
  userId!: string;

  @Column()
  boardId!: string;

  @Column({ nullable: true })
  columnId!: string;

  static toResponse = (task: Tasks): Tasks => {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  };
}
