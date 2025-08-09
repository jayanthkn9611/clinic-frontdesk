import { Router } from "express";
import { AppDataSource } from "../ormconfig";
const router = Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository("QueueEntry");
  const items = await repo.find();
  res.json(items);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository("QueueEntry");
  const last = await repo.find({ order: { queueNumber: "DESC" }, take: 1 });
  const nextNumber = (last.length ? last[0].queueNumber + 1 : 1);
  const item = repo.create({
    patientName: req.body.patientName,
    queueNumber: nextNumber,
    status: 'Waiting'
  });
  await repo.save(item);
  res.json(item);
});

router.patch("/:id/status", async (req, res) => {
  const repo = AppDataSource.getRepository("QueueEntry");
  const q = await repo.findOneBy({ id: parseInt(req.params.id) });
  if (!q) return res.status(404).json({ message: "Not found" });
  q.status = req.body.status;
  await repo.save(q);
  res.json(q);
});

export { router as queueRouter };
