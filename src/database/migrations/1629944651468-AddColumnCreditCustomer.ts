import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCreditCustomer1629944651468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD COLUMN credit numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN credit`);
    }

}
