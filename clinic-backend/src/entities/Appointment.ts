import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @ManyToOne(() => Doctor, { eager: true })
  @JoinColumn()
  doctor: Doctor;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: 'booked' })
  status: string;
}
