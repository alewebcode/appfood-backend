import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnCnpjCompany1637116362294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "cnpj" type varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "cnpj" type bigint`);
    }

}
