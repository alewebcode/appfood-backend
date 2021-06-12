import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('segments')

class Segment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  
  @Column()
  description: string;



}

export { Segment }