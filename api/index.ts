import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Placeholder API until the Express monorepo server is wired with DATABASE_URL.
 * Public pages work from the static SPA; admin CMS needs a Postgres URL + full API.
 *
 * GET endpoints return empty defaults so the SPA never treats the stub as
 * real payload data (avoids crashes like `.find is not a function` on error objects).
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.url ?? "").split("?")[0];
  const method = (req.method ?? "GET").toUpperCase();

  if (method === "GET") {
    if (
      path.includes("page-item-overrides") ||
      path.includes("blog-posts")
    ) {
      res.status(200).json([]);
      return;
    }
    if (path.includes("theme-settings")) {
      res.status(200).json({});
      return;
    }
    if (path.includes("health")) {
      res.status(200).json({ status: "ok", mode: "placeholder" });
      return;
    }
  }

  res.status(503).json({
    error: "API not configured",
    message:
      "Static site is live. Set DATABASE_URL and ADMIN_TOKEN, then enable the full api-server adapter.",
  });
}
