import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserReferralCompanies1631752446294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN user_referral varchar DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN user_referral`);
    }

}
