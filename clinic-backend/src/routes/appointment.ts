import { Router } from "express";
import { AppDataSource } from "../ormconfig";
const router = Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository("Appointment");
  const apps = await repo.find();
  res.json(apps);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository("Appointment");
  const dRepo = AppDataSource.getRepository("Doctor");
  const doc = await dRepo.findOneBy({ id: req.body.doctorId });
  if (!doc) return res.status(400).json({ message: "Doctor not found" });
  
  const appo = repo.create({
    patientName: req.body.patientName,
    doctor: doc,
    date: req.body.date,
    time: req.body.time,
    status: 'booked'
  });
  await repo.save(appo);
  res.json(appo);
});

export { router as appointmentRouter };
