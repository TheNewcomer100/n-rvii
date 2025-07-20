import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGoalSchema, insertTaskSchema, insertMoodEntrySchema, insertReflectionSchema, insertSettingsSchema, insertTaskLogSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Goal routes
  app.get("/api/goals", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const goals = await storage.getGoals(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const goalData = insertGoalSchema.parse({ ...req.body, userId });
      const goal = await storage.createGoal(goalData);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: "Invalid goal data" });
    }
  });

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const goal = await storage.updateGoal(id, req.body);
      if (!goal) return res.status(404).json({ error: "Goal not found" });
      
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: "Failed to update goal" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteGoal(id);
      if (!deleted) return res.status(404).json({ error: "Goal not found" });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete goal" });
    }
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      const goalId = req.query.goalId as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const tasks = await storage.getTasks(userId, goalId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const taskData = insertTaskSchema.parse({ ...req.body, userId });
      const task = await storage.createTask(taskData);
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: "Invalid task data" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.updateTask(id, req.body);
      if (!task) return res.status(404).json({ error: "Task not found" });
      
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: "Failed to update task" });
    }
  });

  // AI Task Generation route (ported from Supabase Edge Function)
  app.post("/api/tasks/generate", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { goalTitle, goalCategory, mood, goalId } = req.body;

      // Check if OpenAI API key is available
      const openAIKey = process.env.OPENAI_API_KEY;
      if (!openAIKey) {
        return res.status(500).json({ 
          error: "AI task generation is not configured. OpenAI API key is missing." 
        });
      }

      // Create system prompt based on mood and goal
      const systemPrompt = `You are an AI task assistant that generates personalized, actionable tasks to help users achieve their goals. 

IMPORTANT: You must respond with ONLY a valid JSON array of task objects. Do not include any markdown formatting, explanations, or additional text.

Generate exactly 3 specific, actionable tasks for the following goal:
- Goal: "${goalTitle}"
- Category: "${goalCategory}"
- User's current mood: "${mood || 'neutral'}"

Each task should be:
1. Specific and actionable
2. Appropriate for someone feeling ${mood || 'neutral'}
3. Directly related to achieving the goal "${goalTitle}"
4. Completable within a reasonable timeframe

Adjust the task complexity and tone based on the user's mood:
- If energized: suggest more ambitious or challenging tasks
- If focused: suggest deep work or concentrated effort tasks
- If tired: suggest gentler, easier tasks to build momentum
- If stressed: suggest calming, organizing, or preparatory tasks
- If feeling burnout: suggest very small, manageable wins

Response format (JSON array only):
[
  {
    "title": "specific task title",
    "description": "detailed description explaining what to do"
  },
  {
    "title": "specific task title", 
    "description": "detailed description explaining what to do"
  },
  {
    "title": "specific task title",
    "description": "detailed description explaining what to do"
  }
]`;

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Generate 3 tasks for goal: "${goalTitle}" (category: ${goalCategory}) for someone feeling ${mood || 'neutral'}` }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Parse the AI response
      let tasks;
      try {
        tasks = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Fallback to default tasks if parsing fails
        tasks = [
          {
            title: `Plan your approach to "${goalTitle}"`,
            description: "Break down your goal into smaller, manageable steps"
          },
          {
            title: `Research best practices for ${goalCategory}`,
            description: "Find resources and strategies that will help you succeed"
          },
          {
            title: `Take the first small step toward "${goalTitle}"`,
            description: "Start with something simple to build momentum"
          }
        ];
      }

      // Validate and ensure we have exactly 3 tasks
      if (!Array.isArray(tasks) || tasks.length !== 3) {
        console.warn('Invalid task format, using fallback');
        tasks = [
          {
            title: `Begin working on "${goalTitle}"`,
            description: "Take the first concrete step toward achieving this goal"
          },
          {
            title: `Plan your ${goalCategory} strategy`,
            description: "Outline your approach and identify key milestones"
          },
          {
            title: `Set up your environment for "${goalTitle}"`,
            description: "Organize your workspace and gather necessary resources"
          }
        ];
      }

      // Save tasks to database
      const tasksToInsert = tasks.map((task: any) => ({
        userId,
        goalId,
        title: task.title,
        description: task.description,
        aiGenerated: true,
        moodContext: mood,
        date: new Date().toISOString().split('T')[0],
        completed: false
      }));

      const insertedTasks = [];
      for (const taskData of tasksToInsert) {
        const insertedTask = await storage.createTask(taskData);
        insertedTasks.push(insertedTask);
      }

      res.json({ 
        success: true, 
        tasks: insertedTasks,
        message: `Generated ${tasks.length} AI-powered tasks for your goal!`
      });

    } catch (error) {
      console.error('Error in generate-ai-tasks:', error);
      res.status(500).json({ 
        error: 'Failed to generate AI tasks',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Mood routes
  app.get("/api/moods", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      const date = req.query.date as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const moods = await storage.getMoodEntries(userId, date);
      res.json(moods);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moods" });
    }
  });

  app.post("/api/moods", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const moodData = insertMoodEntrySchema.parse({ ...req.body, userId });
      const mood = await storage.createMoodEntry(moodData);
      res.json(mood);
    } catch (error) {
      res.status(400).json({ error: "Invalid mood data" });
    }
  });

  // Reflection routes
  app.get("/api/reflections", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      const date = req.query.date as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const reflections = await storage.getReflections(userId, date);
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reflections" });
    }
  });

  app.post("/api/reflections", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const reflectionData = insertReflectionSchema.parse({ ...req.body, userId });
      const reflection = await storage.createReflection(reflectionData);
      res.json(reflection);
    } catch (error) {
      res.status(400).json({ error: "Invalid reflection data" });
    }
  });

  app.put("/api/reflections/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const reflection = await storage.updateReflection(id, content);
      if (!reflection) return res.status(404).json({ error: "Reflection not found" });
      
      res.json(reflection);
    } catch (error) {
      res.status(400).json({ error: "Failed to update reflection" });
    }
  });

  // Settings routes
  app.get("/api/settings", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const settings = await storage.getSettings(userId);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const settingsData = insertSettingsSchema.parse({ ...req.body, userId });
      const settings = await storage.createSettings(settingsData);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid settings data" });
    }
  });

  app.put("/api/settings", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const settings = await storage.updateSettings(userId, req.body);
      if (!settings) return res.status(404).json({ error: "Settings not found" });
      
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Failed to update settings" });
    }
  });

  // Task log routes for pie chart
  app.get("/api/task-logs", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      const date = req.query.date as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const logs = await storage.getTaskLogs(userId, date);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch task logs" });
    }
  });

  app.post("/api/task-logs", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const logData = insertTaskLogSchema.parse({ ...req.body, userId });
      const log = await storage.createTaskLog(logData);
      res.json(log);
    } catch (error) {
      res.status(400).json({ error: "Invalid task log data" });
    }
  });

  app.delete("/api/task-logs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTaskLog(id);
      if (!deleted) return res.status(404).json({ error: "Task log not found" });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task log" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
