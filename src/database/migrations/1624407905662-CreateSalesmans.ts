import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSalesmans1624407905662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'salesmans',
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
                    name:'birthdate',
                    type:'date'

                },
                {
                    name:'cpf',
                    type:'bigint'

                },
                {
                    name:'phone',
                    type:'varchar'

                },
                {
                    name:'email',
                    type:'varchar'

                },
                {
                    name:'zip_code',
                    type:'bigint'

                },
                {
                    name:'street',
                    type:'varchar'

                },
                {
                    name:'number',
                    type:'bigint'

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
                    type:'char(2)'

                },
                {
                    name:'user_id',
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
                    name:'User',
                    columnNames:['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                }
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('salesmans');
    }


}
