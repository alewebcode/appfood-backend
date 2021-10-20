import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1626319833758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'customers',
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
                    name:'cpf',
                    type:'bigint',
                    isNullable: true,

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
                    type:'bigint',
                    isNullable: true,

                },
                {
                    name:'street',
                    type:'varchar',
                    isNullable: true,

                },
                {
                    name:'number',
                    type:'bigint',
                    isNullable: true,

                },
                {
                    name:'complement',
                    type:'varchar',
                    isNullable: true,

                },
                {
                    name:'neighborhood',
                    type:'varchar',
                    isNullable: true,

                },
                {
                    name:'city',
                    type:'varchar',
                    isNullable: true,

                },
                {
                    name:'state',
                    type:'char(2)',
                    isNullable: true,

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
        await queryRunner.dropTable('customers');
    }

}
