import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class QueueEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  queueNumber: number;

  @Column({ default: 'Waiting' })
  status: string;
}
