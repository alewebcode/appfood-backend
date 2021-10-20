import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserReferralUsers1631980352355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN user_referral varchar DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN user_referral`);
    }

}
