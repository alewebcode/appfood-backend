import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnZipCodeCompany1637116441594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "zip_code" type varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "zip_code" type bigint`);
    }

}
