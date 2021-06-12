import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTypeColumnPhoneCompany1621477259122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "phone" type varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "phone" type integer`);
    }

}
