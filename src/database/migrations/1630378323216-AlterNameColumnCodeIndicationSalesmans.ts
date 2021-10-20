import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterNameColumnCodeIndicationSalesmans1630378323216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" RENAME COLUMN "code_indication" TO "referral_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" RENAME COLUMN "referral_code" TO "code_indication"`);
    }

}
