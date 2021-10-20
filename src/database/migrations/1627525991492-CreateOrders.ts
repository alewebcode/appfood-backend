import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1627525991492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'orders',
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
                    name:'date',
                    type:'timestamp'

                },
                {
                    name:'amount',
                    type:'numeric(1000,2)'

                },
                {
                    name:'delivery',
                    type:'boolean'

                },
                {
                    name:'status',
                    type:'varchar'

                },
                {
                    name:'customer_id',
                    type:'integer'

                },
                {
                    name:'company_id',
                    type:'integer'

                },
               
                
                
            ],
            foreignKeys:[
               
                {
                    name:'Customer',
                    columnNames:['customer_id'],
                    referencedTableName: 'customers',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
                {
                    name:'Company',
                    columnNames:['company_id'],
                    referencedTableName: 'companies',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }
    

}
