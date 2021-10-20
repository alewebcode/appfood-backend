import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveColumnCityCompanies1629513868192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN city`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN "city" VARCHAR NOT NULL`);
    }

}
