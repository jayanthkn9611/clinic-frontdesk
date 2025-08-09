import { Router } from "express";
import { AppDataSource } from "../ormconfig";
const router = Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository("Doctor");
  const docs = await repo.find();
  res.json(docs);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository("Doctor");
  const d = repo.create(req.body);
  await repo.save(d);
  res.json(d);
});

export { router as doctorRouter };
