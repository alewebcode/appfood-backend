import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCompanyIdUsers1626227150387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN company_id INTEGER,ADD FOREIGN KEY ("company_id") REFERENCES companies ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company_id"`);
    }

}
