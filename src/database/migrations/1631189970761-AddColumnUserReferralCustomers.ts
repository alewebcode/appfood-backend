import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserReferralCustomers1631189970761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD COLUMN user_referral varchar DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN user_referral`);
    }
}
