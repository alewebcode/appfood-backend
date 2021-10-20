import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveColumnStateCompanies1629514358427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN state`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN "state" VARCHAR NOT NULL`);
    }


}
