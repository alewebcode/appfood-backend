import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterNameColumnCodeIndicationCustomers1630378816041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "code_indication" TO "referral_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "referral_code" TO "code_indication"`);
    }

}
