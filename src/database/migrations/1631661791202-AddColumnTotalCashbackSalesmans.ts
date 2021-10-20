import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalCashbackSalesmans1631661791202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" ADD COLUMN total_cashback numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN total_cashback`);
    }

}
