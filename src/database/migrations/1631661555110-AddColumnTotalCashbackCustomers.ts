import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalCashbackCustomers1631661555110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD COLUMN total_cashback numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN total_cashback`);
    }

}
