import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnZipCodeCompany1621477196345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "zip_code" type bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "zip_code" type integer`);
    }

}
