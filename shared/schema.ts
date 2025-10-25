import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Profile information
export const profile = pgTable("profile", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  bio: text("bio"),
  email: text("email").notNull(),
  linkedin: text("linkedin"),
  githubUsername: text("github_username"),
  twitterHandle: text("twitter_handle"),
  stackOverflowUrl: text("stack_overflow_url"),
  location: text("location"),
  yearsExperience: integer("years_experience"),
  patentCount: integer("patent_count"),
  devicesDeployed: text("devices_deployed"),
  headshotUrl: text("headshot_url"),
  heroBackgroundUrl: text("hero_background_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profile).omit({
  id: true,
  updatedAt: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profile.$inferSelect;

// Skills
export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  items: text("items").array().notNull(),
  specializations: text("specializations").array().notNull().default(sql`ARRAY[]::text[]`),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Experience
export const experiences = pgTable("experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: text("company").notNull(),
  companyLogoUrl: text("company_logo_url"),
  role: text("role").notNull(),
  period: text("period").notNull(),
  location: text("location"),
  type: text("type").notNull(),
  achievements: text("achievements").array().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

// Patents
export const patents = pgTable("patents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  number: text("number").notNull(),
  title: text("title").notNull(),
  year: text("year").notNull(),
  company: text("company").notNull(),
  status: text("status").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertPatentSchema = createInsertSchema(patents).omit({
  id: true,
});

export type InsertPatent = z.infer<typeof insertPatentSchema>;
export type Patent = typeof patents.$inferSelect;

// Projects
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  role: text("role"),
  description: text("description").notNull(),
  impact: text("impact").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  technologies: text("technologies").array().notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Companies (for the "Trusted by" section)
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
});

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

// Skill Items (individual skills like "Swift", "Objective-C", etc.)
export const skillItems = pgTable("skill_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  skillId: varchar("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  isSpecialization: boolean("is_specialization").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertSkillItemSchema = createInsertSchema(skillItems).omit({
  id: true,
});

export type InsertSkillItem = z.infer<typeof insertSkillItemSchema>;
export type SkillItem = typeof skillItems.$inferSelect;

// Junction table for many-to-many relationship between projects and skill items
export const projectSkillItems = pgTable("project_skill_items", {
  projectId: varchar("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  skillItemId: varchar("skill_item_id").notNull().references(() => skillItems.id, { onDelete: "cascade" }),
});

export const insertProjectSkillItemSchema = createInsertSchema(projectSkillItems);

export type InsertProjectSkillItem = z.infer<typeof insertProjectSkillItemSchema>;
export type ProjectSkillItem = typeof projectSkillItems.$inferSelect;

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  publishedAt: z.coerce.date().optional().nullable(),
});

export const updateBlogPostSchema = insertBlogPostSchema.partial();

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Theme Settings (singleton table)
export const themeSettings = pgTable("theme_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  primaryColor: text("primary_color").notNull().default("220 85% 58%"),
  accentColor: text("accent_color").notNull().default("142 85% 50%"),
  backgroundColor: text("background_color").notNull().default("222 47% 11%"),
  foregroundColor: text("foreground_color").notNull().default("213 31% 91%"),
  fontFamily: text("font_family").notNull().default("Inter"),
  headingFontFamily: text("heading_font_family").notNull().default("Inter"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertThemeSettingsSchema = createInsertSchema(themeSettings).omit({
  id: true,
  updatedAt: true,
});

export const updateThemeSettingsSchema = insertThemeSettingsSchema.partial();

export type InsertThemeSettings = z.infer<typeof insertThemeSettingsSchema>;
export type UpdateThemeSettings = z.infer<typeof updateThemeSettingsSchema>;
export type ThemeSettings = typeof themeSettings.$inferSelect;

// Content Blocks (for drag-and-drop reordering)
export const contentBlocks = pgTable("content_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blockType: text("block_type").notNull(),
  title: text("title").notNull(),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertContentBlockSchema = createInsertSchema(contentBlocks).omit({
  id: true,
});

export const updateContentBlockSchema = insertContentBlockSchema.partial();

export type InsertContentBlock = z.infer<typeof insertContentBlockSchema>;
export type UpdateContentBlock = z.infer<typeof updateContentBlockSchema>;
export type ContentBlock = typeof contentBlocks.$inferSelect;

// Chat Prompts (suggested conversation starters)
export const chatPrompts = pgTable("chat_prompts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prompt: text("prompt").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatPromptSchema = createInsertSchema(chatPrompts).omit({
  id: true,
  createdAt: true,
});

export const updateChatPromptSchema = insertChatPromptSchema.partial();

export type InsertChatPrompt = z.infer<typeof insertChatPromptSchema>;
export type UpdateChatPrompt = z.infer<typeof updateChatPromptSchema>;
export type ChatPrompt = typeof chatPrompts.$inferSelect;

// Chat Conversations
export const chatConversations = pgTable("chat_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  title: text("title"),
  lastSummary: text("last_summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertChatConversationSchema = createInsertSchema(chatConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateChatConversationSchema = insertChatConversationSchema.partial();

export type InsertChatConversation = z.infer<typeof insertChatConversationSchema>;
export type UpdateChatConversation = z.infer<typeof updateChatConversationSchema>;
export type ChatConversation = typeof chatConversations.$inferSelect;

// Chat Messages
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").notNull().references(() => chatConversations.id, { onDelete: 'cascade' }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  contextChunks: text("context_chunks").array().default(sql`ARRAY[]::text[]`),
  parentMessageId: varchar("parent_message_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Chat Context Documents (resume, patents, etc.)
export const chatContextDocs = pgTable("chat_context_docs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  label: text("label").notNull(),
  body: text("body").notNull(),
  source: text("source").notNull(),
  priority: integer("priority").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertChatContextDocSchema = createInsertSchema(chatContextDocs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateChatContextDocSchema = insertChatContextDocSchema.partial();

export type InsertChatContextDoc = z.infer<typeof insertChatContextDocSchema>;
export type UpdateChatContextDoc = z.infer<typeof updateChatContextDocSchema>;
export type ChatContextDoc = typeof chatContextDocs.$inferSelect;

// Media Assets (for iPhone carousel)
export const mediaAssets = pgTable("media_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  type: text("type").notNull(),
  mimeType: text("mime_type").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  durationMs: integer("duration_ms"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMediaAssetSchema = createInsertSchema(mediaAssets).omit({
  id: true,
  createdAt: true,
});

export const updateMediaAssetSchema = insertMediaAssetSchema.partial();

export type InsertMediaAsset = z.infer<typeof insertMediaAssetSchema>;
export type UpdateMediaAsset = z.infer<typeof updateMediaAssetSchema>;
export type MediaAsset = typeof mediaAssets.$inferSelect;
