import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalCashbackCompanies1631661700459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN total_cashback numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN total_cashback`);
    }

}
