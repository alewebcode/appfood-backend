import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserIdOrders1631979891492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN user_id INTEGER,ADD FOREIGN KEY ("user_id") REFERENCES users ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "user_id"`);
    }

}
