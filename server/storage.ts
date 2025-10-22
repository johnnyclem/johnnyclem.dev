import {
  type User,
  type InsertUser,
  type Profile,
  type InsertProfile,
  type Skill,
  type InsertSkill,
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
