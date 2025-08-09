import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  availability: string;
}
