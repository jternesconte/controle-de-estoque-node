import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1734482246760 implements MigrationInterface {
    name = 'Default1734482246760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "fl_ativo" SET DEFAULT 'S'`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "fl_ativo" SET DEFAULT 'S'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "fl_ativo" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "fl_ativo" DROP DEFAULT`);
    }

}
