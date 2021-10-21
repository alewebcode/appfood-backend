import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveAutoIncrementUserstype1634778103372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users_type ALTER COLUMN id DROP DEFAULT;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users_type ALTER COLUMN id SET DEFAULT NEXTVAL("users_type_id_seq"::regclass);`);
    }

}
