import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


import { User } from "./User";

@Entity('customers')

class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: number;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  zip_code: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  
  @Column()
  state: string;

  
  @Column()
  referral_code: string;

  @Column()
  user_referral: string;

  @Column()
  commission: number;

  @Column({ type: 'date' })
  birthdate: string;

  @OneToOne(type => User)
  @JoinColumn({ name: 'user_id'})
  user:User

  @Column()
  total_cashback: number;

 

}

export { Customer }