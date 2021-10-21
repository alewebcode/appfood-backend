import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertDefaultUser1634782957396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
           .manager
           .createQueryBuilder()
           .insert()
           .into('users')
           .values([
             
             { 
               name: 'Leo',
               email:'teste@teste.com',
               password:'$2a$08$8kXjV/WnSTWDWSTuxag/XufbPkvTLeiECVgX.Ge94nPS53MdEPocS',
               user_type: 1,
               created_at: 'now()',
               active:true,
               referral_code:'1tLoUj'
             },
           
             
           ])
           .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
