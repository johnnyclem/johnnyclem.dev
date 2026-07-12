import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { siteThemeSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middlewares/admin-auth";

const router: IRouter = Router();

router.get("/theme-settings", async (_req, res) => {
  try {
    const [settings] = await db.select().from(siteThemeSettingsTable).limit(1);
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch theme settings" });
  }
});

router.put("/theme-settings", adminAuth, async (req, res) => {
  try {
    const [existing] = await db.select().from(siteThemeSettingsTable).limit(1);

    if (existing) {
      const [updated] = await db
        .update(siteThemeSettingsTable)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(siteThemeSettingsTable.id, existing.id))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(siteThemeSettingsTable)
        .values(req.body)
        .returning();
      res.status(201).json(created);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update theme settings" });
  }
});

export default router;
