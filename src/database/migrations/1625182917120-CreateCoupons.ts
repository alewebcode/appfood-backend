import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCoupons1625182917120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name:'coupons',
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
                    name:'description',
                    type:'varchar'

                },
                {
                    name:'amount',
                    type:'numeric(1000,2)'

                },
                {
                    name:'expiration_date',
                    type:'timestamp'

                },
                {
                    name:'active',
                    type:'boolean',
                    default:true

                },
                {
                    name:'coupon_code',
                    type:'varchar'

                },
                {
                    name:'product_id',
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
                    name:'Product',
                    columnNames:['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    
                }
            ],
           
           

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('coupons');
    }

}
