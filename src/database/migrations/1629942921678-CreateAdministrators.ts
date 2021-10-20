import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdministrators1629942921678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'administrators',
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
                    name:'user_id',
                    type:'integer'

                },
                {
                    name:'commission',
                    type:'numeric(1000,2)'

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
        await queryRunner.dropTable('administrators');
    }

}
