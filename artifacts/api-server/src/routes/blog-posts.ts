import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middlewares/admin-auth";

const router: IRouter = Router();

router.get("/blog-posts", async (req, res) => {
  try {
    const includeAll = req.headers.authorization?.replace("Bearer ", "") === process.env.ADMIN_TOKEN;
    let results;
    if (includeAll) {
      results = await db
        .select()
        .from(blogPostsTable)
        .orderBy(blogPostsTable.createdAt);
    } else {
      results = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.published, true))
        .orderBy(blogPostsTable.createdAt);
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/blog-posts/:slug", async (req, res) => {
  try {
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, req.params.slug));
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    const isAdmin = req.headers.authorization?.replace("Bearer ", "") === process.env.ADMIN_TOKEN;
    if (!post.published && !isAdmin) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

router.post("/blog-posts", adminAuth, async (req, res) => {
  try {
    const [post] = await db.insert(blogPostsTable).values(req.body).returning();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

router.put("/blog-posts/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [post] = await db
      .update(blogPostsTable)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

router.delete("/blog-posts/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [post] = await db
      .delete(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .returning();
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

export default router;
