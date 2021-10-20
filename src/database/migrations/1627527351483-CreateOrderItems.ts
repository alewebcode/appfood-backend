import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderItems1627527351483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'orders_items',
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
                    name:'product_id',
                    type:'integer'

                },
                {
                    name:'order_id',
                    type:'integer'

                },
                {
                    name:'coupon_id',
                    type:'integer'

                },
               
                
            ],
            foreignKeys:[
                {
                    name:'Product',
                    columnNames:['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
                {
                    name:'Order',
                    columnNames:['order_id'],
                    referencedTableName: 'orders',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
               
                {
                    name:'Coupon',
                    columnNames:['coupon_id'],
                    referencedTableName: 'coupons',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                },
               
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders_items');
    }

}
