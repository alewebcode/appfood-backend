import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";

@Entity('salesmans')

class Salesman {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthdate: string;

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

  @OneToOne(type => User)
  @JoinColumn({ name: 'user_id'})
  user:User

 

}

export { Salesman }