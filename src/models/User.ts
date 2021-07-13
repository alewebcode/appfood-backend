import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./UserType";

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


  @OneToOne(type => UserType)
  @JoinColumn({ name: 'id_user_type'})
  user_type:UserType

}

export { User }