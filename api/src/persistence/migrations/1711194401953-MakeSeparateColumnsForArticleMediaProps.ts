import { MigrationInterface, QueryRunner } from 'typeorm';
import { seedUsers } from '../seeds/seedUsers';

export class MakeSeparateColumnsForArticleMediaProps1711194401953
  implements MigrationInterface
{
  name = 'MakeSeparateColumnsForArticleMediaProps1711194401953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "article" ADD "mediaType" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "article" ADD "mediaUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "article" ADD "mediaCredit" character varying`,
    );
    await seedUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "mediaCredit"`);
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "mediaUrl"`);
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "mediaType"`);
    await queryRunner.query(`ALTER TABLE "article" ADD "media" jsonb`);
  }
}
