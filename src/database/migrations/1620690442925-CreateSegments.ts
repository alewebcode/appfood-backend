import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateSegments1620690442925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'segments',
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
                    name:'description',
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
        await queryRunner.dropTable('segments');
    }

}
