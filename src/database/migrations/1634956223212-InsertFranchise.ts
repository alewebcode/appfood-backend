import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertFranchise1634956223212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into('franchises')
        .values([
          
          { 
            name: 'Franquia teste',
            email:'franquiateste@gmail.com',
            referral_code:'wfrde6',
            commission:0,
            total_cashback:0,
            total_amount:0,
          },
        
          
        ])
        .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
