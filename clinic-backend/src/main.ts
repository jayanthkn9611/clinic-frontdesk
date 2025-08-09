import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { userRouter } from "./routes/user";
import { doctorRouter } from "./routes/doctor";
import { appointmentRouter } from "./routes/appointment";
import { queueRouter } from "./routes/queue";
import * as path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", userRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/queue", queueRouter);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {
  console.log("DB initialized");
  const userRepo = AppDataSource.getRepository("User");
  const u = await userRepo.findOneBy({ username: "staff" } as any);
  if (!u) {
    await userRepo.save({ username: "staff", password: "staff123", role: "staff" });
    console.log("Default user created -> username: staff password: staff123");
  }
  const docRepo = AppDataSource.getRepository("Doctor");
  const docs = await docRepo.find();
  if (docs.length === 0) {
    await docRepo.save({ name: "Dr. Asha", specialization: "General", gender: "Female", location: "Clinic A", availability: "9AM-1PM" });
    await docRepo.save({ name: "Dr. Ravi", specialization: "Pediatrics", gender: "Male", location: "Clinic B", availability: "2PM-6PM" });
    console.log("Sample doctors added");
  }
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}).catch(err => console.error(err));
