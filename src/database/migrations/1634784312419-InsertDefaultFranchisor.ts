import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertDefaultFranchisor1634784312419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
           .manager
           .createQueryBuilder()
           .insert()
           .into('franchisor')
           .values([
             
             { 
               name: 'Administradora',
               email:'teste@teste.com',
               referral_code:'1tLoUj',
               commission:0,
               total_cashback:0,
               total_amount:0,
             }
           
             
           ])
           .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
