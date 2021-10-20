import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCommissionSalesmans1629940298961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" ADD COLUMN commission numeric(1000,2) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN commission`);
    }

}
