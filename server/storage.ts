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
  users,
  profile,
  skills,
  skillItems,
  projectSkillItems,
  experiences,
  patents,
  projects,
  companies,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

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
      .where(eq(projectSkillItems.projectId, projectId))
      .where(eq(projectSkillItems.skillItemId, skillItemId));
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
}

export const storage = new DatabaseStorage();
