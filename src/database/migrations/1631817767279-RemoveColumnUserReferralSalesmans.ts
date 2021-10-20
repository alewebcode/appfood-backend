import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveColumnUserReferralSalesmans1631817767279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN commission`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" ADD COLUMN "commission" VARCHAR NOT NULL`);
    }

}
