import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736523468227 implements MigrationInterface {
    name = 'Default1736523468227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "senha" character varying(100) NOT NULL, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
