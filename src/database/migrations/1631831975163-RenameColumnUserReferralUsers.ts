import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnUserReferralUsers1631831975163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_referral" TO "referral_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "referral_code" TO "user_referral"`);
    }

}
