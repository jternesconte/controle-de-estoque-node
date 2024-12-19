import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1734637728939 implements MigrationInterface {
    name = 'Default1734637728939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb"`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "categorias_id_seq"`);
        await queryRunner.query(`ALTER TABLE "entradas" DROP CONSTRAINT "FK_2c86850c547ff2db55e6484dfed"`);
        await queryRunner.query(`ALTER TABLE "saidas" DROP CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9"`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "produtos_id_seq"`);
        await queryRunner.query(`ALTER TABLE "saidas" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "saidas_id_seq"`);
        await queryRunner.query(`ALTER TABLE "entradas" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "entradas_id_seq"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saidas" ADD CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entradas" ADD CONSTRAINT "FK_2c86850c547ff2db55e6484dfed" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entradas" DROP CONSTRAINT "FK_2c86850c547ff2db55e6484dfed"`);
        await queryRunner.query(`ALTER TABLE "saidas" DROP CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "entradas_id_seq" OWNED BY "entradas"."id"`);
        await queryRunner.query(`ALTER TABLE "entradas" ALTER COLUMN "id" SET DEFAULT nextval('"entradas_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "saidas_id_seq" OWNED BY "saidas"."id"`);
        await queryRunner.query(`ALTER TABLE "saidas" ALTER COLUMN "id" SET DEFAULT nextval('"saidas_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "produtos_id_seq" OWNED BY "produtos"."id"`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "id" SET DEFAULT nextval('"produtos_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "saidas" ADD CONSTRAINT "FK_067f3bbb90554dcdcf52ba51ab9" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entradas" ADD CONSTRAINT "FK_2c86850c547ff2db55e6484dfed" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "categorias_id_seq" OWNED BY "categorias"."id"`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "id" SET DEFAULT nextval('"categorias_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
