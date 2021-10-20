import { Entity,Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";


@Entity('cities')

class City {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  slug: string;

 
}

export { City }