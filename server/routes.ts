import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProfileSchema,
  insertSkillSchema,
  insertExperienceSchema,
  insertPatentSchema,
  insertProjectSchema,
  insertCompanySchema,
} from "@shared/schema";

// Extend express-session
declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// Middleware to check if user is authenticated as admin
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password === ADMIN_PASSWORD) {
      // Regenerate session to prevent fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        req.session.isAdmin = true;
        res.json({ success: true });
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.get("/api/admin/check", async (req, res) => {
    res.json({ isAuthenticated: req.session.isAdmin === true });
  });

  // Profile routes
  app.get("/api/profile", async (_req, res) => {
    const profile = await storage.getProfile();
    res.json(profile);
  });

  app.post("/api/profile", requireAdmin, async (req, res) => {
    try {
      const data = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(data);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/profile/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertProfileSchema.partial().parse(req.body);
      const profile = await storage.updateProfile(req.params.id, data);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Skills routes
  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getAllSkills();
    res.json(skills);
  });

  app.post("/api/skills", requireAdmin, async (req, res) => {
    try {
      const data = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(data);
      res.json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/skills/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(req.params.id, data);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/skills/:id", requireAdmin, async (req, res) => {
    await storage.deleteSkill(req.params.id);
    res.status(204).send();
  });

  // Experience routes
  app.get("/api/experiences", async (_req, res) => {
    const experiences = await storage.getAllExperiences();
    res.json(experiences);
  });

  app.post("/api/experiences", requireAdmin, async (req, res) => {
    try {
      const data = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(data);
      res.json(experience);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/experiences/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(req.params.id, data);
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }
      res.json(experience);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/experiences/:id", requireAdmin, async (req, res) => {
    await storage.deleteExperience(req.params.id);
    res.status(204).send();
  });

  // Patent routes
  app.get("/api/patents", async (_req, res) => {
    const patents = await storage.getAllPatents();
    res.json(patents);
  });

  app.post("/api/patents", requireAdmin, async (req, res) => {
    try {
      const data = insertPatentSchema.parse(req.body);
      const patent = await storage.createPatent(data);
      res.json(patent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/patents/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertPatentSchema.partial().parse(req.body);
      const patent = await storage.updatePatent(req.params.id, data);
      if (!patent) {
        return res.status(404).json({ error: "Patent not found" });
      }
      res.json(patent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/patents/:id", requireAdmin, async (req, res) => {
    await storage.deletePatent(req.params.id);
    res.status(204).send();
  });

  // Project routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.post("/api/projects", requireAdmin, async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/projects/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
    await storage.deleteProject(req.params.id);
    res.status(204).send();
  });

  // Company routes
  app.get("/api/companies", async (_req, res) => {
    const companies = await storage.getAllCompanies();
    res.json(companies);
  });

  app.post("/api/companies", requireAdmin, async (req, res) => {
    try {
      const data = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(data);
      res.json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/companies/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertCompanySchema.partial().parse(req.body);
      const company = await storage.updateCompany(req.params.id, data);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/companies/:id", requireAdmin, async (req, res) => {
    await storage.deleteCompany(req.params.id);
    res.status(204).send();
  });

  const httpServer = createServer(app);

  return httpServer;
}
