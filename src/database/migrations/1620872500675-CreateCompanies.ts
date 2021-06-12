import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateCompanies1620872500675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'companies',
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
                    name:'logo',
                    type:'varchar'

                },
                {
                    name:'trading_name',
                    type:'varchar'

                },
                {
                    name:'cnpj',
                    type:'integer'

                },
                {
                    name:'state_registration',
                    type:'integer'

                },
                {
                    name:'zip_code',
                    type:'integer'

                },
                {
                    name:'adress',
                    type:'varchar'

                },
                {
                    name:'number',
                    type:'integer'

                },
                {
                    name:'complement',
                    type:'varchar'

                },
                {
                    name:'neighborhood',
                    type:'varchar'

                },
                {
                    name:'city',
                    type:'varchar'

                },
                {
                    name:'state',
                    type:'varchar'

                },
                {
                    name:'phone',
                    type:'integer'

                },
                {
                    name:'email',
                    type:'varchar'

                },
                {
                    name:'delivery',
                    type:'boolean'

                },
                {
                    name:'pickup_in_place',
                    type:'boolean'

                },
                {
                    name:'company_indication',
                    type:'varchar'

                },
                {
                    name:'segment_id',
                    type:'integer'

                },
                {
                    name:'created_at',
                    type:'timestamp',
                    default:'now()'

                },
                
                
            ],
            foreignKeys:[
               
                {
                    name:'Segment',
                    columnNames:['segment_id'],
                    referencedTableName: 'segments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                }
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('companies');
    }

}
