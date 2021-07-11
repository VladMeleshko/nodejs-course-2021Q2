import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Users } from '../entities/user';
import * as bcrypt from 'bcrypt';

export class Users1626007460818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    await queryRunner.manager.insert(Users, {
      name: 'admin',
      login: 'admin',
      password: bcrypt.hashSync('admin', salt),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Users, { name: 'admin', login: 'admin' });
    await queryRunner.dropTable('Users');
  }
}
