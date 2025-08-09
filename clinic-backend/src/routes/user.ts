import { Router } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../ormconfig";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_demo_key";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userRepo = AppDataSource.getRepository("User");
  const user = await userRepo.findOneBy({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

export { router as userRouter };
