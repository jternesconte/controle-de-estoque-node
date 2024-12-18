import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1734481994259 implements MigrationInterface {
    name = 'Default1734481994259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" text, "fl_ativo" character(1) NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" text, "preco" numeric(10,2) NOT NULL, "quantidade" integer NOT NULL DEFAULT '0', "fl_ativo" character(1) NOT NULL, "categoria_id" integer NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entradas" ("id" SERIAL NOT NULL, "quantidade" integer NOT NULL, "data_entrada" TIMESTAMP NOT NULL DEFAULT now(), "produto_id" integer NOT NULL, CONSTRAINT "PK_9ff94dd07177e1e8175e121322b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saidas" ("id" SERIAL NOT NULL, "quantidade" integer NOT NULL, "data_saida" TIMESTAMP NOT NULL DEFAULT now(), "produto_id" integer NOT NULL, CONSTRAINT "PK_d44c9283da290f61f53fb1c80dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entradas" ADD CONSTRAINT "FK_2c86850c547ff2db55e6484dfed" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saidas" ADD CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saidas" DROP CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9"`);
        await queryRunner.query(`ALTER TABLE "entradas" DROP CONSTRAINT "FK_2c86850c547ff2db55e6484dfed"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb"`);
        await queryRunner.query(`DROP TABLE "saidas"`);
        await queryRunner.query(`DROP TABLE "entradas"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
