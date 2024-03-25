import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1710788760943 implements MigrationInterface {
  name = 'Initial1710788760943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
