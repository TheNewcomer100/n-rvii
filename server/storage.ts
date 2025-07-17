import { 
  users, 
  goals, 
  tasks, 
  moodEntries, 
  reflections, 
  settings,
  onboardingProgress,
  userPreferences,
  taskLogs,
  type User, 
  type InsertUser,
  type Goal,
  type InsertGoal,
  type Task,
  type InsertTask,
  type MoodEntry,
  type InsertMoodEntry,
  type Reflection,
  type InsertReflection,
  type Settings,
  type InsertSettings,
  type TaskLog,
  type InsertTaskLog
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Goal methods
  getGoals(userId: string): Promise<Goal[]>;
  getGoal(id: string): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | undefined>;
  deleteGoal(id: string): Promise<boolean>;
  
  // Task methods
  getTasks(userId: string, goalId?: string): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  
  // Mood methods
  getMoodEntries(userId: string, date?: string): Promise<MoodEntry[]>;
  createMoodEntry(moodEntry: InsertMoodEntry): Promise<MoodEntry>;
  
  // Reflection methods
  getReflections(userId: string, date?: string): Promise<Reflection[]>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  updateReflection(id: string, content: string): Promise<Reflection | undefined>;
  
  // Settings methods
  getSettings(userId: string): Promise<Settings | undefined>;
  createSettings(settings: InsertSettings): Promise<Settings>;
  updateSettings(userId: string, updates: Partial<Settings>): Promise<Settings | undefined>;
  
  // Task log methods
  getTaskLogs(userId: string, date?: string): Promise<TaskLog[]>;
  createTaskLog(taskLog: InsertTaskLog): Promise<TaskLog>;
  deleteTaskLog(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Goal methods
  async getGoals(userId: string): Promise<Goal[]> {
    return await db.select().from(goals).where(eq(goals.userId, userId));
  }

  async getGoal(id: string): Promise<Goal | undefined> {
    const result = await db.select().from(goals).where(eq(goals.id, id)).limit(1);
    return result[0];
  }

  async createGoal(goal: InsertGoal): Promise<Goal> {
    const result = await db.insert(goals).values(goal).returning();
    return result[0];
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | undefined> {
    const result = await db.update(goals).set(updates).where(eq(goals.id, id)).returning();
    return result[0];
  }

  async deleteGoal(id: string): Promise<boolean> {
    const result = await db.delete(goals).where(eq(goals.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Task methods
  async getTasks(userId: string, goalId?: string): Promise<Task[]> {
    if (goalId) {
      return await db.select().from(tasks).where(and(eq(tasks.userId, userId), eq(tasks.goalId, goalId)));
    }
    return await db.select().from(tasks).where(eq(tasks.userId, userId));
  }

  async getTask(id: string): Promise<Task | undefined> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return result[0];
  }

  async createTask(task: InsertTask): Promise<Task> {
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const result = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return result[0];
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Mood methods
  async getMoodEntries(userId: string, date?: string): Promise<MoodEntry[]> {
    if (date) {
      return await db.select().from(moodEntries).where(and(eq(moodEntries.userId, userId), eq(moodEntries.date, date)));
    }
    return await db.select().from(moodEntries).where(eq(moodEntries.userId, userId));
  }

  async createMoodEntry(moodEntry: InsertMoodEntry): Promise<MoodEntry> {
    const result = await db.insert(moodEntries).values(moodEntry).returning();
    return result[0];
  }

  // Reflection methods
  async getReflections(userId: string, date?: string): Promise<Reflection[]> {
    if (date) {
      return await db.select().from(reflections).where(and(eq(reflections.userId, userId), eq(reflections.date, date)));
    }
    return await db.select().from(reflections).where(eq(reflections.userId, userId));
  }

  async createReflection(reflection: InsertReflection): Promise<Reflection> {
    const result = await db.insert(reflections).values(reflection).returning();
    return result[0];
  }

  async updateReflection(id: string, content: string): Promise<Reflection | undefined> {
    const result = await db.update(reflections).set({ content }).where(eq(reflections.id, id)).returning();
    return result[0];
  }

  // Settings methods
  async getSettings(userId: string): Promise<Settings | undefined> {
    const result = await db.select().from(settings).where(eq(settings.userId, userId)).limit(1);
    return result[0];
  }

  async createSettings(settingsData: InsertSettings): Promise<Settings> {
    const result = await db.insert(settings).values(settingsData).returning();
    return result[0];
  }

  async updateSettings(userId: string, updates: Partial<Settings>): Promise<Settings | undefined> {
    const result = await db.update(settings).set(updates).where(eq(settings.userId, userId)).returning();
    return result[0];
  }

  // Task log methods
  async getTaskLogs(userId: string, date?: string): Promise<TaskLog[]> {
    if (date) {
      return await db.select().from(taskLogs).where(and(eq(taskLogs.userId, userId), eq(taskLogs.date, date)));
    }
    return await db.select().from(taskLogs).where(eq(taskLogs.userId, userId));
  }

  async createTaskLog(taskLog: InsertTaskLog): Promise<TaskLog> {
    const result = await db.insert(taskLogs).values(taskLog).returning();
    return result[0];
  }

  async deleteTaskLog(id: string): Promise<boolean> {
    const result = await db.delete(taskLogs).where(eq(taskLogs.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
