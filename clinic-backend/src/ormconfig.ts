import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Doctor } from "./entities/Doctor";
import { Appointment } from "./entities/Appointment";
import { QueueEntry } from "./entities/QueueEntry";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "clinic.db",
  synchronize: true,
  logging: false,
  entities: [User, Doctor, Appointment, QueueEntry],
});
