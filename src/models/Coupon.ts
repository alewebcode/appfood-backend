import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "./Product";

@Entity('coupons')

class Coupon {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  amount: string;

  @Column()
  expiration_date: string;

  @Column()
  active: boolean;

  @Column()
  coupon_code: string;


  @OneToOne(type => Product)
  @JoinColumn({ name: 'product_id'})
  product:Product

 

}

export { Coupon }