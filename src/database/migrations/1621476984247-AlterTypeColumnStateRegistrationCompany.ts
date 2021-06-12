import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnStateRegistrationCompany1621476984247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "state_registration" type bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "state_registration" type integer`);
    }

}
