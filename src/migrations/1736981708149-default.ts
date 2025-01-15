import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736981708149 implements MigrationInterface {
    name = 'Default1736981708149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" text, "fl_ativo" character(1) NOT NULL DEFAULT 'S', CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saidas" ADD "usuario_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entradas" ADD "usuario_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "saidas" ADD CONSTRAINT "FK_110108710b4a8e69ee23617d27a" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entradas" ADD CONSTRAINT "FK_bdfe27ce012790b05d0f202b805" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entradas" DROP CONSTRAINT "FK_bdfe27ce012790b05d0f202b805"`);
        await queryRunner.query(`ALTER TABLE "saidas" DROP CONSTRAINT "FK_110108710b4a8e69ee23617d27a"`);
        await queryRunner.query(`ALTER TABLE "entradas" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`ALTER TABLE "saidas" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`DROP TABLE "cargos"`);
    }

}
