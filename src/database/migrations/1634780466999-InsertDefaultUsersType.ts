import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertDefaultUsersType1634780466999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
           .manager
           .createQueryBuilder()
           .insert()
           .into('users_type')
           .values([
             
             { id:1,name: 'ADMINISTRADOR',created_at: '2021-10-20 23:11:05.078429' },
             { id:2,name: 'VENDEDOR',created_at: '2021-10-20 23:11:05.078429' },
             { id:3,name: 'CLIENTE',created_at: '2021-10-20 23:11:05.078429' },
             { id:4,name: 'EMPRESA',created_at: '2021-10-20 23:11:05.078429' },
             { id:5,name: 'FRANQUIA',created_at: '2021-10-20 23:11:05.078429' }
             
             
             
           ])
           .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
