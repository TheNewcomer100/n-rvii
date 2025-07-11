
-- Add missing columns to tasks table for AI task generation
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS mood_context TEXT;

-- Update existing tasks to have default values for new columns
UPDATE public.tasks 
SET ai_generated = false 
WHERE ai_generated IS NULL;
