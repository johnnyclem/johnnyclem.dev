import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { passwordMiddleware } from "./password-middleware.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist", "public");
const port = parseInt(process.env.PORT || "3000", 10);

const app = express();

app.use(passwordMiddleware);

app.use((req, res, next) => {
  const urlPath = path.posix
    .normalize(req.path)
    .replace(/\/$/, "") || "/";

  if (urlPath !== "/" && !urlPath.includes("..")) {
    const indexFile = path.join(distDir, urlPath, "index.html");
    if (fs.existsSync(indexFile)) {
      return res.sendFile(indexFile);
    }
  }

  next();
});

app.use(express.static(distDir));

app.use((req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Serving on port ${port}`);
});
