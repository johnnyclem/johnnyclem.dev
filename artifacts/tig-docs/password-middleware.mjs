import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROTECTED_PATH = "/quantum";
const REALM = "Restricted";
const PASSWORD = "quantum";
const HTML_FILE = path.join(__dirname, "private", "quantum.html");

function isProtectedPath(urlPath) {
  if (!urlPath) return false;
  const cleaned = urlPath.split("?")[0].replace(/\/+$/, "") || "/";
  return cleaned === PROTECTED_PATH || cleaned === `${PROTECTED_PATH}/`;
}

function checkAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;
  try {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    if (idx === -1) return false;
    const password = decoded.slice(idx + 1);
    return password === PASSWORD;
  } catch {
    return false;
  }
}

function sendUnauthorized(res) {
  res.statusCode = 401;
  res.setHeader("WWW-Authenticate", `Basic realm="${REALM}", charset="UTF-8"`);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Authentication required.");
}

function serveHtml(res) {
  fs.readFile(HTML_FILE, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Failed to load page.");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(data);
  });
}

export function passwordMiddleware(req, res, next) {
  if (!isProtectedPath(req.url)) {
    return next();
  }
  if (!checkAuth(req.headers.authorization)) {
    return sendUnauthorized(res);
  }
  serveHtml(res);
}
