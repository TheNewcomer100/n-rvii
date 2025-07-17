import { pgTable, text, serial, integer, boolean, timestamp, uuid, date, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - simplified from Supabase auth
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  onboardingComplete: boolean("onboarding_complete").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Goals table
export const goals = pgTable("goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").default("personal"),
  completed: boolean("completed").default(false),
  priority: text("priority").default("medium"),
  specific: text("specific"),
  measurable: text("measurable"),
  achievable: text("achievable"),
  relevant: text("relevant"),
  timeBound: text("time_bound"),
  targetDate: text("target_date"),
  progressPercentage: integer("progress_percentage").default(0),
  targetEnergyLevel: integer("target_energy_level"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  goalId: uuid("goal_id").references(() => goals.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  aiGenerated: boolean("ai_generated").default(false),
  moodContext: text("mood_context"),
  energyRequired: integer("energy_required"),
  estimatedDuration: integer("estimated_duration"),
  priorityScore: integer("priority_score").default(1),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Mood entries table
export const moodEntries = pgTable("mood_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  mood: text("mood").notNull(),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Energy logs table
export const energyLogs = pgTable("energy_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  energyLevel: integer("energy_level").notNull(),
  energyLabel: text("energy_label").notNull(),
  notes: text("notes"),
  context: jsonb("context"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reflections table
export const reflections = pgTable("reflections", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  content: text("content").notNull(),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Settings/Streaks table
export const settings = pgTable("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  streakCount: integer("streak_count").default(0),
  lastStreakDate: date("last_streak_date"),
  reminderTime: text("reminder_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Onboarding progress table
export const onboardingProgress = pgTable("onboarding_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  currentStep: integer("current_step").default(1),
  completedSteps: text("completed_steps").array(),
  preferences: jsonb("preferences"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User preferences table
export const userPreferences = pgTable("user_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  subscriptionTier: text("subscription_tier").default("free"),
  notificationSettings: jsonb("notification_settings"),
  privacySettings: jsonb("privacy_settings"),
  displayPreferences: jsonb("display_preferences"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Task logs table for pie chart tracking
export const taskLogs = pgTable("task_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  activity: text("activity").notNull(),
  duration: integer("duration").notNull(), // in minutes
  date: date("date").notNull(),
  hour: integer("hour").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  avatarUrl: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).omit({
  id: true,
  createdAt: true,
});

export const insertReflectionSchema = createInsertSchema(reflections).omit({
  id: true,
  createdAt: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskLogSchema = createInsertSchema(taskLogs).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;
export type InsertReflection = z.infer<typeof insertReflectionSchema>;
export type Reflection = typeof reflections.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;
export type InsertTaskLog = z.infer<typeof insertTaskLogSchema>;
export type TaskLog = typeof taskLogs.$inferSelect;
