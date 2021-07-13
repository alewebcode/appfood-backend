import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_type')

class UserType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;


}

export { UserType }