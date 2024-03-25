import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChannelAndArticleTables1710886609459
  implements MigrationInterface
{
  name = 'AddChannelAndArticleTables1710886609459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "image" jsonb, "pubDate" TIMESTAMP WITH TIME ZONE NOT NULL, "externalLastUpdate" TIMESTAMP NOT NULL, "feedUrl" character varying NOT NULL, CONSTRAINT "UQ_9a971c99f8dc817fc66aa304b7a" UNIQUE ("feedUrl"), CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "externalGuid" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "contentSnippet" character varying NOT NULL, "link" character varying NOT NULL, "pubDate" TIMESTAMP WITH TIME ZONE NOT NULL, "creator" character varying NOT NULL, "media" jsonb, "channelId" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "article" ADD CONSTRAINT "FK_c43fc32d50ee689b016923d06a4" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_c43fc32d50ee689b016923d06a4"`,
    );
    await queryRunner.query(`DROP TABLE "article"`);
    await queryRunner.query(`DROP TABLE "channel"`);
  }
}
