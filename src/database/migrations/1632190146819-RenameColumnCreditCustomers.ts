import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnCreditCustomers1632190146819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "credit" TO "commission"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "commission" TO "credit"`);
    }

}
