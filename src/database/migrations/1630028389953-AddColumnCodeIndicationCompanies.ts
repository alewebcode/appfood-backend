import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCodeIndicationCompanies1630028389953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN code_indication varchar NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN code_indication`);
    }

}
