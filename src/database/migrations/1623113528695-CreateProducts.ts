import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1623113528695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'products',
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
                    name:'image',
                    type:'varchar'

                },
                {
                    name:'description',
                    type:'varchar'

                },
                {
                    name:'price',
                    type:'numeric(1000,2)'

                },
                {
                    name:'company_id',
                    type:'integer'

                },
                {
                    name:'category_id',
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
                    name:'Company',
                    columnNames:['company_id'],
                    referencedTableName: 'companies',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
                {
                    name:'Category',
                    columnNames:['category_id'],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                }
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('products');
    }

}
