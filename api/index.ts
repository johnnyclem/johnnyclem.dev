import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import path from 'path';
import { registerRoutes } from '../server/routes';
import { seedDatabase } from '../server/seed';
import { pool } from '../server/db';

// Initialize app and run seed once
let app: express.Application | null = null;
let initializationPromise: Promise<express.Application> | null = null;

async function createApp(): Promise<express.Application> {
  const expressApp = express();

  // Trust proxy for Vercel
  expressApp.set('trust proxy', 1);

  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));

  // Configure PostgreSQL session store
  const PgStore = connectPgSimple(session);

  expressApp.use(session({
    store: new PgStore({
      pool: pool as any,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Always secure in Vercel production
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
    proxy: true,
  }));

  // Request logging
  expressApp.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.path.startsWith('/api')) {
        console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
      }
    });
    next();
  });

  // Seed database and register routes
  await seedDatabase();
  await registerRoutes(expressApp);

  // Error handler
  expressApp.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  return expressApp;
}

// Get or create the app (singleton pattern for serverless)
async function getApp(): Promise<express.Application> {
  if (app) return app;

  if (!initializationPromise) {
    initializationPromise = createApp();
  }

  app = await initializationPromise;
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Validate environment
  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'ADMIN_PASSWORD environment variable is required' });
    return;
  }

  try {
    const expressApp = await getApp();
    // Bridge Vercel request to Express
    return new Promise((resolve, reject) => {
      expressApp(req as any, res as any, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}