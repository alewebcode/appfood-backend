import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalCashbackAdministrators1631661393528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" ADD COLUMN total_cashback numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP COLUMN total_cashback`);
    }

}
