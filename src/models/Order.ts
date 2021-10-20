import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";


import { Company } from "./Company";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@Entity('orders')

class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: string;

  @Column()
  amount: number;

  @Column()
  delivery: boolean;

  @Column()
  status: string;


  @OneToOne(type => Company)
  @JoinColumn({ name: 'company_id'})
  company:Company

  @OneToOne(type => Customer)
  @JoinColumn({ name: 'customer_id'})
  customer:Customer

  @OneToOne(type => User)
  @JoinColumn({ name: 'user_id'})
  user:User

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

  @OneToMany(() => OrderItem, product => product.product)
    products: OrderItem[];
 

}

export { Order }