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
  insertChatPromptSchema,
  updateChatPromptSchema,
  insertChatConversationSchema,
  updateChatConversationSchema,
  insertChatMessageSchema,
  insertChatContextDocSchema,
  updateChatContextDocSchema,
  insertMediaAssetSchema,
  updateMediaAssetSchema,
  insertMediaAppearanceSchema,
  updateMediaAppearanceSchema,
} from "@shared/schema";
import { sendMessage } from "./chat-service";
import { textToSpeech } from "./elevenlabs-service";

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
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    
    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    console.log(`[Auth] Login attempt received (password length: ${password?.length || 0})`);
    
    if (password === ADMIN_PASSWORD) {
      console.log("[Auth] Password correct, creating admin session");
      // Regenerate session to prevent fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          console.error("[Auth] Session regeneration error:", err);
          return res.status(500).json({ error: "Login failed" });
        }
        req.session.isAdmin = true;
        // Explicitly save the session before sending response
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error("[Auth] Session save error:", saveErr);
            return res.status(500).json({ error: "Failed to save session" });
          }
          console.log("[Auth] Login successful, session created");
          res.json({ success: true });
        });
      });
    } else {
      console.log("[Auth] Invalid password provided");
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

  // Stack Overflow activity proxy (avoids CORS issues)
  app.get("/api/stackoverflow/:userId/activity", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Fetch both answers and questions
      const [answersResponse, questionsResponse] = await Promise.all([
        fetch(
          `https://api.stackexchange.com/2.3/users/${userId}/answers?order=desc&sort=activity&site=stackoverflow&pagesize=10`,
          {
            headers: {
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip',
            },
          }
        ),
        fetch(
          `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow&pagesize=5`,
          {
            headers: {
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip',
            },
          }
        ),
      ]);

      if (!answersResponse.ok || !questionsResponse.ok) {
        return res.status(500).json({ error: 'Failed to fetch Stack Overflow activity' });
      }

      const [answersData, questionsData] = await Promise.all([
        answersResponse.json(),
        questionsResponse.json(),
      ]);

      // For answers, we need to fetch the parent question titles
      const answerItems = answersData.items || [];
      const questionIds = answerItems.map((answer: any) => answer.question_id).join(';');
      
      let enrichedAnswers = answerItems;
      if (questionIds) {
        const questionsForAnswersResponse = await fetch(
          `https://api.stackexchange.com/2.3/questions/${questionIds}?site=stackoverflow`,
          {
            headers: {
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip',
            },
          }
        );

        if (questionsForAnswersResponse.ok) {
          const questionsForAnswersData = await questionsForAnswersResponse.json();
          const questionTitleMap = new Map(
            (questionsForAnswersData.items || []).map((q: any) => [q.question_id, q.title])
          );

          enrichedAnswers = answerItems.map((answer: any) => ({
            ...answer,
            title: questionTitleMap.get(answer.question_id) || 'Answer',
            type: 'answer',
          }));
        }
      }

      // Combine and sort by activity_date
      const activities = [
        ...enrichedAnswers.map((item: any) => ({ ...item, type: 'answer' })),
        ...(questionsData.items || []).map((item: any) => ({ ...item, type: 'question' })),
      ].sort((a, b) => b.last_activity_date - a.last_activity_date)
        .slice(0, 5); // Get top 5 most recent

      res.json({ items: activities, quota_remaining: answersData.quota_remaining });
    } catch (error) {
      console.error('Error fetching Stack Overflow activity:', error);
      res.status(500).json({ error: 'Failed to fetch Stack Overflow activity' });
    }
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

  // Chat Prompt routes
  app.get("/api/chat/prompts", async (_req, res) => {
    const prompts = await storage.getActiveChatPrompts();
    res.json(prompts);
  });

  app.get("/api/admin/chat/prompts", requireAdmin, async (_req, res) => {
    const prompts = await storage.getAllChatPrompts();
    res.json(prompts);
  });

  app.post("/api/admin/chat/prompts", requireAdmin, async (req, res) => {
    try {
      const data = insertChatPromptSchema.parse(req.body);
      const prompt = await storage.createChatPrompt(data);
      res.json(prompt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/chat/prompts/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateChatPromptSchema.parse(req.body);
      const prompt = await storage.updateChatPrompt(req.params.id, data);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/chat/prompts/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteChatPrompt(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/chat/prompts/reorder", requireAdmin, async (req, res) => {
    try {
      const { prompts } = req.body;
      await storage.updateChatPromptOrder(prompts);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Chat Conversation routes
  app.post("/api/chat/conversations", async (req, res) => {
    try {
      const sessionId = req.sessionID;
      
      let conversation = await storage.getChatConversationBySessionId(sessionId);
      
      if (!conversation) {
        const data = insertChatConversationSchema.parse({
          sessionId,
          title: "New Conversation",
        });
        conversation = await storage.createChatConversation(data);
      }
      
      res.json(conversation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/chat/conversations/:id", async (req, res) => {
    const conversation = await storage.getChatConversation(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  });

  // Chat Message routes
  app.post("/api/chat/conversations/:id/messages", async (req, res) => {
    try {
      const { content } = req.body;
      const conversationId = req.params.id;
      
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: "Message content is required" });
      }
      
      const result = await sendMessage(conversationId, content);
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to send message" });
    }
  });

  app.get("/api/chat/conversations/:id/messages", async (req, res) => {
    const messages = await storage.getChatMessagesByConversationId(req.params.id);
    res.json(messages);
  });

  // Voice generation for chat messages
  app.post("/api/chat/messages/:messageId/voice", async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const message = await storage.getChatMessage(messageId);
      
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      if (message.role !== "assistant") {
        return res.status(400).json({ error: "Voice generation only available for assistant messages" });
      }

      const audioBuffer = await textToSpeech(message.content);
      
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length.toString());
      res.send(audioBuffer);
    } catch (error: any) {
      console.error("Voice generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate voice" });
    }
  });

  // Direct text-to-speech endpoint
  app.post("/api/chat/text-to-speech", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const audioBuffer = await textToSpeech(text);
      
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length.toString());
      res.send(audioBuffer);
    } catch (error: any) {
      console.error("Voice generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate voice" });
    }
  });

  // Chat Context Document routes (admin only)
  app.get("/api/admin/chat/context-docs", requireAdmin, async (_req, res) => {
    const docs = await storage.getAllChatContextDocs();
    res.json(docs);
  });

  app.post("/api/admin/chat/context-docs", requireAdmin, async (req, res) => {
    try {
      const data = insertChatContextDocSchema.parse(req.body);
      const doc = await storage.createChatContextDoc(data);
      res.json(doc);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/chat/context-docs/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateChatContextDocSchema.parse(req.body);
      const doc = await storage.updateChatContextDoc(req.params.id, data);
      if (!doc) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json(doc);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/chat/context-docs/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteChatContextDoc(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Media Asset routes (for carousel)
  app.get("/api/media-assets", async (_req, res) => {
    const assets = await storage.getAllMediaAssets();
    res.json(assets);
  });

  app.post("/api/admin/media-assets", requireAdmin, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = `/attached_assets/uploads/${req.file.filename}`;
      
      const data = insertMediaAssetSchema.parse({
        title: req.body.title || req.file.originalname,
        description: req.body.description || null,
        mediaType: req.body.mediaType || 'image',
        url: fileUrl,
        thumbnailUrl: fileUrl,
        sortOrder: parseInt(req.body.sortOrder || '0'),
      });

      const asset = await storage.createMediaAsset(data);
      res.json(asset);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/media-assets/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateMediaAssetSchema.parse(req.body);
      const asset = await storage.updateMediaAsset(req.params.id, data);
      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }
      res.json(asset);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/media-assets/:id", requireAdmin, async (req, res) => {
    try {
      const asset = await storage.getMediaAsset(req.params.id);
      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      if (asset.url.startsWith('/attached_assets/uploads/')) {
        const filename = path.basename(asset.url);
        const filepath = path.join(process.cwd(), 'attached_assets', 'uploads', filename);
        try {
          await fs.unlink(filepath);
        } catch (err) {
          console.error('Failed to delete file:', err);
        }
      }

      await storage.deleteMediaAsset(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/media-assets/reorder", requireAdmin, async (req, res) => {
    try {
      const { assets } = req.body;
      await storage.updateMediaAssetOrder(assets);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Media Appearance routes (podcasts, speaking, interviews)
  app.get("/api/media-appearances", async (_req, res) => {
    const appearances = await storage.getAllMediaAppearances();
    res.json(appearances);
  });

  app.post("/api/admin/media-appearances", requireAdmin, async (req, res) => {
    try {
      const data = insertMediaAppearanceSchema.parse(req.body);
      const appearance = await storage.createMediaAppearance(data);
      res.json(appearance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/media-appearances/:id", requireAdmin, async (req, res) => {
    try {
      const data = updateMediaAppearanceSchema.parse(req.body);
      const appearance = await storage.updateMediaAppearance(req.params.id, data);
      if (!appearance) {
        return res.status(404).json({ error: "Appearance not found" });
      }
      res.json(appearance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/media-appearances/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteMediaAppearance(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/media-appearances/reorder", requireAdmin, async (req, res) => {
    try {
      const { appearances } = req.body;
      await storage.updateMediaAppearanceOrder(appearances);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
