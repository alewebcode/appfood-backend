import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Segment } from "./Segment";
import { City } from "./City";
import { Product } from "./Product";

@Entity('companies')

class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  trading_name: string;

  @Column()
  cnpj: number;

  @Column()
  state_registration: number;

  @Column()
  zip_code: number;

  @Column()
  number: number;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  delivery: boolean;

  @Column()
  pickup_in_place: boolean;

  @Column()
  company_indication: string;

  @Column()
  referral_code: string;

  @Column()
  user_referral: string;

  @Column()
  commission: number;

  @OneToOne(type => Segment)
  @JoinColumn({ name: 'segment_id'})
  segment:Segment;

  @OneToOne(type => City)
  @JoinColumn({ name: 'city_id'})
  city:City;

  @OneToMany(type => Product, product => product.company)
  products: Product[];
  
  @Column()
  total_cashback: number;
 

}

export { Company }