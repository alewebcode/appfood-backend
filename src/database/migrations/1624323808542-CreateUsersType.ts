import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersType1624323808542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'users_type',
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
                    name:'created_at',
                    type:'timestamp',
                    default:'now()'

                },  
                
            ],
           
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_type');
    }

}
