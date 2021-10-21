import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertDefaultCity1634785944271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
           .manager
           .createQueryBuilder()
           .insert()
           .into('cities')
           .values([
             
             { 
               name: 'Juiz de Fora',
               state:'MG',
               slug:'juiz-de-fora-mg',
               
             }
           
             
           ])
           .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
