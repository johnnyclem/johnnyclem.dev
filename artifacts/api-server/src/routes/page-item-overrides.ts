import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { pageItemOverridesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middlewares/admin-auth";

const router: IRouter = Router();

router.get("/page-item-overrides", async (req, res) => {
  try {
    const registryType = req.query.registryType as string | undefined;
    if (registryType) {
      const results = await db
        .select()
        .from(pageItemOverridesTable)
        .where(eq(pageItemOverridesTable.registryType, registryType));
      res.json(results);
    } else {
      const results = await db.select().from(pageItemOverridesTable);
      res.json(results);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch page item overrides" });
  }
});

router.put("/page-item-overrides/:registryType/:slug", adminAuth, async (req, res) => {
  try {
    const { registryType, slug } = req.params;

    const [result] = await db
      .insert(pageItemOverridesTable)
      .values({ ...req.body, registryType, slug })
      .onConflictDoUpdate({
        target: [pageItemOverridesTable.registryType, pageItemOverridesTable.slug],
        set: { ...req.body, updatedAt: new Date() },
      })
      .returning();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update page item override" });
  }
});

export default router;
