import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnAdressCompany1621474398226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "adress" TO "street"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "street" TO "adress"`);
    }

}
