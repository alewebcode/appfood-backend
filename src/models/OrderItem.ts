import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";


import { Product } from "./Product";
import { Order } from "./Order";
import { Coupon } from "./Coupon";

@Entity('orders_items')

class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => Product)
  @JoinColumn({ name: 'product_id'})
  product:Product

  @ManyToOne(type => Order)
  @JoinColumn({ name: 'order_id'})
  order:Order

  @ManyToOne(type => Coupon)
  @JoinColumn({ name: 'coupon_id'})
  coupon:Coupon

 
}

export { OrderItem }