import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Segment } from "./Segment";

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
  city: string;

  @Column()
  state: string;

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

  @OneToOne(type => Segment)
  @JoinColumn({ name: 'segment_id'})
  segment:Segment



  

}

export { Company }