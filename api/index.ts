import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Placeholder API until the Express monorepo server is wired with DATABASE_URL.
 * Public pages work from the static SPA; admin CMS needs a Postgres URL + full API.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(503).json({
    error: "API not configured",
    message:
      "Static site is live. Set DATABASE_URL and ADMIN_TOKEN, then enable the full api-server adapter.",
  });
}
