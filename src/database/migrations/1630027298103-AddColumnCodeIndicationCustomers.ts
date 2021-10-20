import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCodeIndicationCustomers1630027298103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD COLUMN code_indication varchar NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN code_indication`);
    }

}
