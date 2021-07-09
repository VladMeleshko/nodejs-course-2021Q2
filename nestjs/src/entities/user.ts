import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  static toResponse = (
    user: Users,
  ): { id: string; name: string; login: string } => {
    const { id, name, login } = user;
    return { id, name, login };
  };
}
