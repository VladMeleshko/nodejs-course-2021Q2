import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Users } from '../entities/user';
import { hashUserPassword } from '../validate-session';

export class UserMigration1624120318968 implements MigrationInterface {
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

    const adminPassword = hashUserPassword('admin');
    queryRunner.manager.insert(Users, {
      name: 'admin',
      login: 'admin',
      password: adminPassword,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users');
  }
}
