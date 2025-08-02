import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  // Set default DATABASE_URL if not provided
  process.env.DATABASE_URL = "postgresql://neondb_owner:npg_d12WZAkIgQzX@ep-little-sea-a8qefqcb-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
