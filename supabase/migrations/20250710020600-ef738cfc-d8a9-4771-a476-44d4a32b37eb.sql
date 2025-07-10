
-- Update user_preferences table to include subscription tier if not already present
ALTER TABLE public.user_preferences 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';

-- Create tasks table to store AI-generated and user tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  ai_generated BOOLEAN DEFAULT false,
  mood_context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create task_generation_logs table for analytics
CREATE TABLE public.task_generation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
  mood TEXT,
  tasks_generated INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create feedback table to store user feedback
CREATE TABLE public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tasks table
CREATE POLICY "Users can view their own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON public.tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for task_generation_logs
CREATE POLICY "Users can view their own task generation logs" ON public.task_generation_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own task generation logs" ON public.task_generation_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for feedback
CREATE POLICY "Users can create feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_goal_id ON public.tasks(goal_id);
CREATE INDEX idx_task_generation_logs_user_id ON public.task_generation_logs(user_id);
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at);

-- Update trigger for tasks updated_at
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
