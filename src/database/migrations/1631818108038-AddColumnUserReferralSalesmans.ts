import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserReferralSalesmans1631818108038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" ADD COLUMN user_referral varchar DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN user_referral`);
    }

}
