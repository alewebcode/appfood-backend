import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnBirthDateCustomers1631558421584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD COLUMN birthdate DATE DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN birthdate`);
    }

}
