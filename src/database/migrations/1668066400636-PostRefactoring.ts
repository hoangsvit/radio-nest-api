import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PostRefactoring1668066400636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              unsigned: true,
              generationStrategy: 'increment',
            },
            {
              name: 'username',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'profile_fields',
              type: 'text',
            },
            {
              name: 'group',
              type: 'int',
              default: 1,
            },
            {
              name: 'salt',
              type: 'varchar',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'domainid',
              type: 'int',
            },
            {
              name: 'facebook_id',
              type: 'int',
              default: 0,
            },
            {
              name: 'twitter_id',
              type: 'int',
              default: 0,
            },
            {
              name: 'login_hash',
              type: 'varchar',
            },
            {
              name: 'last_login',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'updated_at',
              type: 'int',
              isNullable: true,
            },
          ],
        }),
        false,
      );
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`,
    ); // reverts things made in "up" method
  }
}
