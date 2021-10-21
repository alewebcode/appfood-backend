import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users_type')

class UserType {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;


}

export { UserType }