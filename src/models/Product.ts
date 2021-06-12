import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Company } from "./Company";
import { Category } from "./Category";

@Entity('products')

class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @OneToOne(type => Company)
  @JoinColumn({ name: 'company_id'})
  company:Company

  @OneToOne(type => Category)
  @JoinColumn({ name: 'category_id'})
  category:Category

}

export { Product }