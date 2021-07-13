import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnActiveUser1624627001142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "active" BOOLEAN DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
