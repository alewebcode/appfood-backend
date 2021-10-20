import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnCodeIndicationSalesmans1630028532110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" ADD COLUMN code_indication varchar NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN code_indication`);
    }

}
