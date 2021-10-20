import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGeneralSettings1629853020876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'general_settings',
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
                    name:'commission_salesman',
                    type:'numeric(10,2)'

                },
                {
                    name:'commission_company',
                    type:'numeric(10,2)'

                },
                {
                    name:'credit_customer',
                    type:'numeric(10,2)' 

                }
                
                
            ],
            
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('general_settings');
    }

}
