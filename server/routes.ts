import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import {
  insertProfileSchema,
  insertSkillSchema,
  insertSkillItemSchema,
  insertExperienceSchema,
  insertPatentSchema,
  insertProjectSchema,
  insertCompanySchema,
  insertBlogPostSchema,
  updateBlogPostSchema,
  insertThemeSettingsSchema,
  updateThemeSettingsSchema,
  insertContentBlockSchema,
  updateContentBlockSchema,
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

  // Skill Items routes
  app.get("/api/skill-items", async (_req, res) => {
    const skillItems = await storage.getAllSkillItems();
    res.json(skillItems);
  });

  app.get("/api/skill-items/:slug", async (req, res) => {
    const skillItem = await storage.getSkillItemBySlug(req.params.slug);
    if (!skillItem) {
      return res.status(404).json({ error: "Skill item not found" });
    }
    res.json(skillItem);
  });

  app.get("/api/skill-items/:slug/projects", async (req, res) => {
    const skillItem = await storage.getSkillItemBySlug(req.params.slug);
    if (!skillItem) {
      return res.status(404).json({ error: "Skill item not found" });
    }
    const projects = await storage.getProjectsForSkillItem(skillItem.id);
    
    // Enrich projects with their skill items
    const enrichedProjects = await Promise.all(
      projects.map(async (project) => ({
        ...project,
        skillItems: await storage.getSkillItemsForProject(project.id),
      }))
    );
    
    res.json(enrichedProjects);
  });

  app.post("/api/skill-items", requireAdmin, async (req, res) => {
    try {
      const data = insertSkillItemSchema.parse(req.body);
      const skillItem = await storage.createSkillItem(data);
      res.json(skillItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/skill-items/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertSkillItemSchema.partial().parse(req.body);
      const skillItem = await storage.updateSkillItem(req.params.id, data);
      if (!skillItem) {
        return res.status(404).json({ error: "Skill item not found" });
      }
      res.json(skillItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/skill-items/:id", requireAdmin, async (req, res) => {
    await storage.deleteSkillItem(req.params.id);
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
  app.get("/api/projects", async (req, res) => {
    const projects = await storage.getAllProjects();
    
    // Enrich projects with their skill items
    const enrichedProjects = await Promise.all(
      projects.map(async (project) => ({
        ...project,
        skillItems: await storage.getSkillItemsForProject(project.id),
      }))
    );
    
    res.json(enrichedProjects);
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

  // Project-Skill junction routes
  app.post("/api/projects/:projectId/skills/:skillItemId", requireAdmin, async (req, res) => {
    try {
      await storage.addSkillToProject(req.params.projectId, req.params.skillItemId);
      res.status(201).json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/projects/:projectId/skills/:skillItemId", requireAdmin, async (req, res) => {
    await storage.removeSkillFromProject(req.params.projectId, req.params.skillItemId);
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

  // Blog Post routes
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getPublishedBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/all", requireAdmin, async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const post = await storage.getBlogPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  app.post("/api/blog-posts", requireAdmin, async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/blog-posts/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, data);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/blog-posts/:id", requireAdmin, async (req, res) => {
    await storage.deleteBlogPost(req.params.id);
    res.status(204).send();
  });

  // Theme Settings routes
  app.get("/api/theme-settings", async (_req, res) => {
    const settings = await storage.getThemeSettings();
    res.json(settings);
  });

  app.post("/api/theme-settings", requireAdmin, async (req, res) => {
    try {
      const data = insertThemeSettingsSchema.parse(req.body);
      const settings = await storage.createThemeSettings(data);
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/theme-settings/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateThemeSettingsSchema.parse(req.body);
      const settings = await storage.updateThemeSettings(req.params.id, data);
      if (!settings) {
        return res.status(404).json({ error: "Theme settings not found" });
      }
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Content Block routes
  app.get("/api/content-blocks", async (_req, res) => {
    const blocks = await storage.getAllContentBlocks();
    res.json(blocks);
  });

  app.post("/api/content-blocks", requireAdmin, async (req, res) => {
    try {
      const data = insertContentBlockSchema.parse(req.body);
      const block = await storage.createContentBlock(data);
      res.json(block);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/content-blocks/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateContentBlockSchema.parse(req.body);
      const block = await storage.updateContentBlock(req.params.id, data);
      if (!block) {
        return res.status(404).json({ error: "Content block not found" });
      }
      res.json(block);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/content-blocks/reorder", requireAdmin, async (req, res) => {
    try {
      const { blocks } = req.body;
      await storage.updateContentBlockOrder(blocks);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/content-blocks/:id", requireAdmin, async (req, res) => {
    await storage.deleteContentBlock(req.params.id);
    res.status(204).send();
  });

  // File upload configuration
  const upload = multer({
    storage: multer.diskStorage({
      destination: async (_req: any, _file: any, cb: any) => {
        const uploadDir = path.join(process.cwd(), "attached_assets/uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        cb(null, uploadDir);
      },
      filename: (_req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed'));
    }
  });

  // File upload route
  app.post("/api/upload", requireAdmin, upload.single('file'), async (req: any, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/attached_assets/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  });

  const httpServer = createServer(app);

  return httpServer;
}
