import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFranchises1631752215336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'franchises',
            columns:[
                {
                    name:'id',
                    type:'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment',
                },
                {
                    name:'name',
                    type:'varchar'

                },
                {
                    name:'email',
                    type:'varchar'

                },
                {
                    name:'referral_code',
                    type:'varchar'

                },
                {
                    name:'commission',
                    type:'numeric(1000,2)'

                },
                {
                    name:'total_cashback',
                    type:'numeric(1000,2)'

                },
                {
                    name:'total_amount',
                    type:'numeric(1000,2)'

                },
                
                
                
            ],
            
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('franchises');
    }

}
