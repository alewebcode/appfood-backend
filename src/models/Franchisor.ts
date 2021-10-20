import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";


@Entity('franchisor')

class Franchisor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  referral_code: string;

  @Column()
  commission: number;

  @Column()
  total_cashback: number;
  
  @Column()
  total_amount: number;

  user_type:number;

 
}

export { Franchisor }