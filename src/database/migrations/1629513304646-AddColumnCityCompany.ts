import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCityCompany1629513304646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD COLUMN city_id INTEGER,ADD FOREIGN KEY ("city_id") REFERENCES cities ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "city_id"`);
    }

}
