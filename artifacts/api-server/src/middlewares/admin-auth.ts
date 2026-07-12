import { Request, Response, NextFunction } from "express";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(500).json({ error: "Admin token not configured" });
    return;
  }

  if (!token || token !== adminToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
