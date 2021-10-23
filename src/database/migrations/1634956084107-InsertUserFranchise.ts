import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertUserFranchise1634956084107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
           .manager
           .createQueryBuilder()
           .insert()
           .into('users')
           .values([
             
             { 
               name: 'Franquia teste',
               email:'franquiateste@gmail.com',
               password:'$2a$08$8kXjV/WnSTWDWSTuxag/XufbPkvTLeiECVgX.Ge94nPS53MdEPocS',
               user_type: 5,
               created_at: 'now()',
               active:true,
               referral_code:'wfrde6'
             },
           
             
           ])
           .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
