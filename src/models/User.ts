import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate } from "typeorm";
import { UserType } from "./UserType";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { Company } from "./Company";

@Entity('users')

class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column()
  referral_code: string;

  @Column()
  user_referral: string;

  @OneToOne(type => UserType)
  @JoinColumn({ name: 'id_user_type'})
  user_type:UserType

  @OneToOne(type => Company)
  @JoinColumn({ name: 'company_id'})
  company:Company

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    this.password = bcrypt.hashSync(this.password,8);
  }

  // async comparePassword(attempt:string):Promise<boolean>{
  //   return await bcrypt.compare(attempt,this.password)
  // }
  // generateToken(){
  //   return jwt.sign({ id: this.id }, "secret", {
  //     expiresIn: 86400
  //   });
  // }

}

export { User }