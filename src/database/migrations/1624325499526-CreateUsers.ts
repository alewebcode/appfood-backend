import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1624325499526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'users',
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
                    name:'password',
                    type:'varchar'

                },
                {
                    name:'id_user_type',
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
                    name:'UserType',
                    columnNames:['id_user_type'],
                    referencedTableName: 'users_type',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                }
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }


}
