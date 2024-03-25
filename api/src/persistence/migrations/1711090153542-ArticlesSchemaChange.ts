import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArticlesSchemaChange1711090153542 implements MigrationInterface {
  name = 'ArticlesSchemaChange1711090153542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" DROP COLUMN "contentSnippet"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" ADD "contentSnippet" character varying NOT NULL`,
    );
  }
}
