-- Add priority field to goals table
ALTER TABLE public.goals 
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'));

-- Update existing goals to have medium priority if null
UPDATE public.goals SET priority = 'medium' WHERE priority IS NULL;