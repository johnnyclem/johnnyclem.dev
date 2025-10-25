import {
  type User,
  type InsertUser,
  type Profile,
  type InsertProfile,
  type Skill,
  type InsertSkill,
  type SkillItem,
  type InsertSkillItem,
  type ProjectSkillItem,
  type InsertProjectSkillItem,
  type Experience,
  type InsertExperience,
  type Patent,
  type InsertPatent,
  type Project,
  type InsertProject,
  type Company,
  type InsertCompany,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type ThemeSettings,
  type InsertThemeSettings,
  type UpdateThemeSettings,
  type ContentBlock,
  type InsertContentBlock,
  type UpdateContentBlock,
  type ChatPrompt,
  type InsertChatPrompt,
  type UpdateChatPrompt,
  type ChatConversation,
  type InsertChatConversation,
  type UpdateChatConversation,
  type ChatMessage,
  type InsertChatMessage,
  type ChatContextDoc,
  type InsertChatContextDoc,
  type UpdateChatContextDoc,
  type MediaAsset,
  type InsertMediaAsset,
  type UpdateMediaAsset,
  type MediaAppearance,
  type InsertMediaAppearance,
  type UpdateMediaAppearance,
  users,
  profile,
  skills,
  skillItems,
  projectSkillItems,
  experiences,
  patents,
  projects,
  companies,
  blogPosts,
  themeSettings,
  contentBlocks,
  chatPrompts,
  chatConversations,
  chatMessages,
  chatContextDocs,
  mediaAssets,
  mediaAppearances,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  createProfile(data: InsertProfile): Promise<Profile>;
  updateProfile(id: string, data: Partial<InsertProfile>): Promise<Profile | undefined>;

  // Skills methods
  getAllSkills(): Promise<Skill[]>;
  createSkill(data: InsertSkill): Promise<Skill>;
  updateSkill(id: string, data: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<void>;

  // Skill Items methods
  getAllSkillItems(): Promise<SkillItem[]>;
  getSkillItemsBySkillId(skillId: string): Promise<SkillItem[]>;
  getSkillItemBySlug(slug: string): Promise<SkillItem | undefined>;
  createSkillItem(data: InsertSkillItem): Promise<SkillItem>;
  updateSkillItem(id: string, data: Partial<InsertSkillItem>): Promise<SkillItem | undefined>;
  deleteSkillItem(id: string): Promise<void>;

  // Project-Skill Items junction methods
  addSkillToProject(projectId: string, skillItemId: string): Promise<void>;
  removeSkillFromProject(projectId: string, skillItemId: string): Promise<void>;
  getSkillItemsForProject(projectId: string): Promise<SkillItem[]>;
  getProjectsForSkillItem(skillItemId: string): Promise<Project[]>;

  // Experience methods
  getAllExperiences(): Promise<Experience[]>;
  createExperience(data: InsertExperience): Promise<Experience>;
  updateExperience(id: string, data: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: string): Promise<void>;

  // Patent methods
  getAllPatents(): Promise<Patent[]>;
  createPatent(data: InsertPatent): Promise<Patent>;
  updatePatent(id: string, data: Partial<InsertPatent>): Promise<Patent | undefined>;
  deletePatent(id: string): Promise<void>;

  // Project methods
  getAllProjects(): Promise<Project[]>;
  createProject(data: InsertProject): Promise<Project>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // Company methods
  getAllCompanies(): Promise<Company[]>;
  createCompany(data: InsertCompany): Promise<Company>;
  updateCompany(id: string, data: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<void>;

  // Blog Post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(data: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, data: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<void>;

  // Theme Settings methods
  getThemeSettings(): Promise<ThemeSettings | undefined>;
  createThemeSettings(data: InsertThemeSettings): Promise<ThemeSettings>;
  updateThemeSettings(id: string, data: UpdateThemeSettings): Promise<ThemeSettings | undefined>;

  // Content Block methods
  getAllContentBlocks(): Promise<ContentBlock[]>;
  createContentBlock(data: InsertContentBlock): Promise<ContentBlock>;
  updateContentBlock(id: string, data: UpdateContentBlock): Promise<ContentBlock | undefined>;
  updateContentBlockOrder(blocks: Array<{ id: string; sortOrder: number }>): Promise<void>;
  deleteContentBlock(id: string): Promise<void>;

  // Chat Prompt methods
  getAllChatPrompts(): Promise<ChatPrompt[]>;
  getActiveChatPrompts(): Promise<ChatPrompt[]>;
  getChatPrompt(id: string): Promise<ChatPrompt | undefined>;
  createChatPrompt(data: InsertChatPrompt): Promise<ChatPrompt>;
  updateChatPrompt(id: string, data: UpdateChatPrompt): Promise<ChatPrompt | undefined>;
  updateChatPromptOrder(prompts: Array<{ id: string; sortOrder: number }>): Promise<void>;
  deleteChatPrompt(id: string): Promise<void>;

  // Chat Conversation methods
  getChatConversation(id: string): Promise<ChatConversation | undefined>;
  getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined>;
  createChatConversation(data: InsertChatConversation): Promise<ChatConversation>;
  updateChatConversation(id: string, data: UpdateChatConversation): Promise<ChatConversation | undefined>;
  deleteChatConversation(id: string): Promise<void>;

  // Chat Message methods
  getChatMessage(id: string): Promise<ChatMessage | undefined>;
  getChatMessagesByConversationId(conversationId: string): Promise<ChatMessage[]>;
  createChatMessage(data: InsertChatMessage): Promise<ChatMessage>;

  // Chat Context Doc methods
  getAllChatContextDocs(): Promise<ChatContextDoc[]>;
  createChatContextDoc(data: InsertChatContextDoc): Promise<ChatContextDoc>;
  updateChatContextDoc(id: string, data: UpdateChatContextDoc): Promise<ChatContextDoc | undefined>;
  deleteChatContextDoc(id: string): Promise<void>;

  // Media Asset methods (for carousel)
  getAllMediaAssets(): Promise<MediaAsset[]>;
  getMediaAsset(id: string): Promise<MediaAsset | undefined>;
  createMediaAsset(data: InsertMediaAsset): Promise<MediaAsset>;
  updateMediaAsset(id: string, data: UpdateMediaAsset): Promise<MediaAsset | undefined>;
  updateMediaAssetOrder(assets: Array<{ id: string; sortOrder: number }>): Promise<void>;
  deleteMediaAsset(id: string): Promise<void>;

  // Media Appearance methods (podcasts, speaking engagements, interviews)
  getAllMediaAppearances(): Promise<MediaAppearance[]>;
  getMediaAppearance(id: string): Promise<MediaAppearance | undefined>;
  createMediaAppearance(data: InsertMediaAppearance): Promise<MediaAppearance>;
  updateMediaAppearance(id: string, data: UpdateMediaAppearance): Promise<MediaAppearance | undefined>;
  updateMediaAppearanceOrder(appearances: Array<{ id: string; sortOrder: number }>): Promise<void>;
  deleteMediaAppearance(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    const [profileData] = await db.select().from(profile).limit(1);
    return profileData || undefined;
  }

  async createProfile(data: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profile).values(data).returning();
    return newProfile;
  }

  async updateProfile(id: string, data: Partial<InsertProfile>): Promise<Profile | undefined> {
    const [updated] = await db
      .update(profile)
      .set(data)
      .where(eq(profile.id, id))
      .returning();
    return updated || undefined;
  }

  // Skills methods
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.sortOrder));
  }

  async createSkill(data: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(data).returning();
    return skill;
  }

  async updateSkill(id: string, data: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updated] = await db
      .update(skills)
      .set(data)
      .where(eq(skills.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSkill(id: string): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }

  // Skill Items methods
  async getAllSkillItems(): Promise<SkillItem[]> {
    return await db.select().from(skillItems).orderBy(asc(skillItems.sortOrder));
  }

  async getSkillItemsBySkillId(skillId: string): Promise<SkillItem[]> {
    return await db.select().from(skillItems).where(eq(skillItems.skillId, skillId)).orderBy(asc(skillItems.sortOrder));
  }

  async getSkillItemBySlug(slug: string): Promise<SkillItem | undefined> {
    const [item] = await db.select().from(skillItems).where(eq(skillItems.slug, slug));
    return item || undefined;
  }

  async createSkillItem(data: InsertSkillItem): Promise<SkillItem> {
    const [skillItem] = await db.insert(skillItems).values(data).returning();
    return skillItem;
  }

  async updateSkillItem(id: string, data: Partial<InsertSkillItem>): Promise<SkillItem | undefined> {
    const [updated] = await db
      .update(skillItems)
      .set(data)
      .where(eq(skillItems.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSkillItem(id: string): Promise<void> {
    await db.delete(skillItems).where(eq(skillItems.id, id));
  }

  // Project-Skill Items junction methods
  async addSkillToProject(projectId: string, skillItemId: string): Promise<void> {
    await db.insert(projectSkillItems).values({ projectId, skillItemId });
  }

  async removeSkillFromProject(projectId: string, skillItemId: string): Promise<void> {
    await db.delete(projectSkillItems)
      .where(and(
        eq(projectSkillItems.projectId, projectId),
        eq(projectSkillItems.skillItemId, skillItemId)
      ));
  }

  async getSkillItemsForProject(projectId: string): Promise<SkillItem[]> {
    const result = await db
      .select({ skillItem: skillItems })
      .from(projectSkillItems)
      .innerJoin(skillItems, eq(projectSkillItems.skillItemId, skillItems.id))
      .where(eq(projectSkillItems.projectId, projectId))
      .orderBy(asc(skillItems.sortOrder));
    return result.map(r => r.skillItem);
  }

  async getProjectsForSkillItem(skillItemId: string): Promise<Project[]> {
    const result = await db
      .select({ project: projects })
      .from(projectSkillItems)
      .innerJoin(projects, eq(projectSkillItems.projectId, projects.id))
      .where(eq(projectSkillItems.skillItemId, skillItemId))
      .orderBy(asc(projects.sortOrder));
    return result.map(r => r.project);
  }

  // Experience methods
  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(asc(experiences.sortOrder));
  }

  async createExperience(data: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(data).returning();
    return experience;
  }

  async updateExperience(
    id: string,
    data: Partial<InsertExperience>,
  ): Promise<Experience | undefined> {
    const [updated] = await db
      .update(experiences)
      .set(data)
      .where(eq(experiences.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteExperience(id: string): Promise<void> {
    await db.delete(experiences).where(eq(experiences.id, id));
  }

  // Patent methods
  async getAllPatents(): Promise<Patent[]> {
    return await db.select().from(patents).orderBy(asc(patents.sortOrder));
  }

  async createPatent(data: InsertPatent): Promise<Patent> {
    const [patent] = await db.insert(patents).values(data).returning();
    return patent;
  }

  async updatePatent(id: string, data: Partial<InsertPatent>): Promise<Patent | undefined> {
    const [updated] = await db
      .update(patents)
      .set(data)
      .where(eq(patents.id, id))
      .returning();
    return updated || undefined;
  }

  async deletePatent(id: string): Promise<void> {
    await db.delete(patents).where(eq(patents.id, id));
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.sortOrder));
  }

  async createProject(data: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Company methods
  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(asc(companies.sortOrder));
  }

  async createCompany(data: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values(data).returning();
    return company;
  }

  async updateCompany(id: string, data: Partial<InsertCompany>): Promise<Company | undefined> {
    const [updated] = await db
      .update(companies)
      .set(data)
      .where(eq(companies.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteCompany(id: string): Promise<void> {
    await db.delete(companies).where(eq(companies.id, id));
  }

  // Blog Post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(asc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(asc(blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(data).returning();
    return post;
  }

  async updateBlogPost(id: string, data: UpdateBlogPost): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Theme Settings methods
  async getThemeSettings(): Promise<ThemeSettings | undefined> {
    const [settings] = await db.select().from(themeSettings).limit(1);
    return settings || undefined;
  }

  async createThemeSettings(data: InsertThemeSettings): Promise<ThemeSettings> {
    const [settings] = await db.insert(themeSettings).values(data).returning();
    return settings;
  }

  async updateThemeSettings(id: string, data: UpdateThemeSettings): Promise<ThemeSettings | undefined> {
    const [updated] = await db
      .update(themeSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(themeSettings.id, id))
      .returning();
    return updated || undefined;
  }

  // Content Block methods
  async getAllContentBlocks(): Promise<ContentBlock[]> {
    return await db.select().from(contentBlocks).orderBy(asc(contentBlocks.sortOrder));
  }

  async createContentBlock(data: InsertContentBlock): Promise<ContentBlock> {
    const [block] = await db.insert(contentBlocks).values(data).returning();
    return block;
  }

  async updateContentBlock(id: string, data: UpdateContentBlock): Promise<ContentBlock | undefined> {
    const [updated] = await db
      .update(contentBlocks)
      .set(data)
      .where(eq(contentBlocks.id, id))
      .returning();
    return updated || undefined;
  }

  async updateContentBlockOrder(blocks: Array<{ id: string; sortOrder: number }>): Promise<void> {
    await Promise.all(
      blocks.map((block) =>
        db.update(contentBlocks)
          .set({ sortOrder: block.sortOrder })
          .where(eq(contentBlocks.id, block.id))
      )
    );
  }

  async deleteContentBlock(id: string): Promise<void> {
    await db.delete(contentBlocks).where(eq(contentBlocks.id, id));
  }

  // Chat Prompt methods
  async getAllChatPrompts(): Promise<ChatPrompt[]> {
    return await db.select().from(chatPrompts).orderBy(asc(chatPrompts.sortOrder));
  }

  async getActiveChatPrompts(): Promise<ChatPrompt[]> {
    return await db.select().from(chatPrompts).where(eq(chatPrompts.isActive, true)).orderBy(asc(chatPrompts.sortOrder));
  }

  async getChatPrompt(id: string): Promise<ChatPrompt | undefined> {
    const [prompt] = await db.select().from(chatPrompts).where(eq(chatPrompts.id, id));
    return prompt || undefined;
  }

  async createChatPrompt(data: InsertChatPrompt): Promise<ChatPrompt> {
    const [prompt] = await db.insert(chatPrompts).values(data).returning();
    return prompt;
  }

  async updateChatPrompt(id: string, data: UpdateChatPrompt): Promise<ChatPrompt | undefined> {
    const [updated] = await db
      .update(chatPrompts)
      .set(data)
      .where(eq(chatPrompts.id, id))
      .returning();
    return updated || undefined;
  }

  async updateChatPromptOrder(prompts: Array<{ id: string; sortOrder: number }>): Promise<void> {
    await Promise.all(
      prompts.map(({ id, sortOrder }) =>
        db.update(chatPrompts).set({ sortOrder }).where(eq(chatPrompts.id, id))
      )
    );
  }

  async deleteChatPrompt(id: string): Promise<void> {
    await db.delete(chatPrompts).where(eq(chatPrompts.id, id));
  }

  // Chat Conversation methods
  async getChatConversation(id: string): Promise<ChatConversation | undefined> {
    const [conversation] = await db.select().from(chatConversations).where(eq(chatConversations.id, id));
    return conversation || undefined;
  }

  async getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
    const [conversation] = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId));
    return conversation || undefined;
  }

  async createChatConversation(data: InsertChatConversation): Promise<ChatConversation> {
    const [conversation] = await db.insert(chatConversations).values(data).returning();
    return conversation;
  }

  async updateChatConversation(id: string, data: UpdateChatConversation): Promise<ChatConversation | undefined> {
    const [updated] = await db
      .update(chatConversations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(chatConversations.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteChatConversation(id: string): Promise<void> {
    await db.delete(chatConversations).where(eq(chatConversations.id, id));
  }

  // Chat Message methods
  async getChatMessage(id: string): Promise<ChatMessage | undefined> {
    const [message] = await db.select().from(chatMessages).where(eq(chatMessages.id, id));
    return message || undefined;
  }

  async getChatMessagesByConversationId(conversationId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(asc(chatMessages.createdAt));
  }

  async createChatMessage(data: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(data).returning();
    return message;
  }

  // Chat Context Doc methods
  async getAllChatContextDocs(): Promise<ChatContextDoc[]> {
    return await db.select().from(chatContextDocs).orderBy(asc(chatContextDocs.priority));
  }

  async createChatContextDoc(data: InsertChatContextDoc): Promise<ChatContextDoc> {
    const [doc] = await db.insert(chatContextDocs).values(data).returning();
    return doc;
  }

  async updateChatContextDoc(id: string, data: UpdateChatContextDoc): Promise<ChatContextDoc | undefined> {
    const [updated] = await db
      .update(chatContextDocs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(chatContextDocs.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteChatContextDoc(id: string): Promise<void> {
    await db.delete(chatContextDocs).where(eq(chatContextDocs.id, id));
  }

  // Media Asset methods (for carousel)
  async getAllMediaAssets(): Promise<MediaAsset[]> {
    return await db.select().from(mediaAssets).orderBy(asc(mediaAssets.sortOrder));
  }

  async getMediaAsset(id: string): Promise<MediaAsset | undefined> {
    const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id));
    return asset || undefined;
  }

  async createMediaAsset(data: InsertMediaAsset): Promise<MediaAsset> {
    const [asset] = await db.insert(mediaAssets).values(data).returning();
    return asset;
  }

  async updateMediaAsset(id: string, data: UpdateMediaAsset): Promise<MediaAsset | undefined> {
    const [updated] = await db
      .update(mediaAssets)
      .set(data)
      .where(eq(mediaAssets.id, id))
      .returning();
    return updated || undefined;
  }

  async updateMediaAssetOrder(assets: Array<{ id: string; sortOrder: number }>): Promise<void> {
    await Promise.all(
      assets.map(({ id, sortOrder }) =>
        db.update(mediaAssets).set({ sortOrder }).where(eq(mediaAssets.id, id))
      )
    );
  }

  async deleteMediaAsset(id: string): Promise<void> {
    await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  }

  // Media Appearance methods (podcasts, speaking engagements, interviews)
  async getAllMediaAppearances(): Promise<MediaAppearance[]> {
    return await db.select().from(mediaAppearances).orderBy(asc(mediaAppearances.sortOrder));
  }

  async getMediaAppearance(id: string): Promise<MediaAppearance | undefined> {
    const [appearance] = await db.select().from(mediaAppearances).where(eq(mediaAppearances.id, id));
    return appearance || undefined;
  }

  async createMediaAppearance(data: InsertMediaAppearance): Promise<MediaAppearance> {
    const [appearance] = await db.insert(mediaAppearances).values(data).returning();
    return appearance;
  }

  async updateMediaAppearance(id: string, data: UpdateMediaAppearance): Promise<MediaAppearance | undefined> {
    const [updated] = await db
      .update(mediaAppearances)
      .set(data)
      .where(eq(mediaAppearances.id, id))
      .returning();
    return updated || undefined;
  }

  async updateMediaAppearanceOrder(appearances: Array<{ id: string; sortOrder: number }>): Promise<void> {
    await Promise.all(
      appearances.map(({ id, sortOrder }) =>
        db.update(mediaAppearances).set({ sortOrder }).where(eq(mediaAppearances.id, id))
      )
    );
  }

  async deleteMediaAppearance(id: string): Promise<void> {
    await db.delete(mediaAppearances).where(eq(mediaAppearances.id, id));
  }
}

export const storage = new DatabaseStorage();
