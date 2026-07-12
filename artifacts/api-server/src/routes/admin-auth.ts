import { Router, type IRouter } from "express";
import { adminAuth } from "../middlewares/admin-auth";

const router: IRouter = Router();

router.post("/admin/verify", adminAuth, (_req, res) => {
  res.json({ authenticated: true });
});

export default router;
