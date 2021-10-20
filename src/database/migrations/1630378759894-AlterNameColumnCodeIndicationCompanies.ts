import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterNameColumnCodeIndicationCompanies1630378759894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "code_indication" TO "referral_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "referral_code" TO "code_indication"`);
    }

}
