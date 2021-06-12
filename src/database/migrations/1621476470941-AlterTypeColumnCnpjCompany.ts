import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnCnpjCompany1621476470941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "cnpj" type bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "cnpj" type integer`);
    }

}
