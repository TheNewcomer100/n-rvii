
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AITaskGeneratorProps {
  goalId: string;
  mood: string | null;
  goalCategory: string;
  goalTitle: string;
  onTasksGenerated: (tasks: any[]) => void;
}

const AITaskGenerator = ({ goalId, mood, goalCategory, goalTitle, onTasksGenerated }: AITaskGeneratorProps) => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTasks = async () => {
    if (!user) return;

    setIsGenerating(true);

    try {
      // For now, we'll generate mock AI tasks since we don't have OpenAI Edge Function yet
      // This will be replaced with actual AI generation
      const mockTasks = generateMockTasks(goalTitle, goalCategory, mood);

      // Save tasks to database
      const tasksToInsert = mockTasks.map(task => ({
        user_id: user.id,
        goal_id: goalId,
        title: task.title,
        description: task.description,
        ai_generated: true,
        mood_context: mood
      }));

      const { data, error } = await supabase
        .from('tasks')
        .insert(tasksToInsert)
        .select();

      if (error) throw error;

      // Log generation
      await supabase
        .from('task_generation_logs')
        .insert({
          user_id: user.id,
          goal_id: goalId,
          mood: mood,
          tasks_generated: mockTasks.length
        });

      onTasksGenerated(data || []);
      
      toast({
        title: "✨ AI Tasks Generated!",
        description: `Created ${mockTasks.length} personalized tasks for your goal`
      });

    } catch (error) {
      console.error('Error generating tasks:', error);
      toast({
        title: "Error generating tasks",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockTasks = (goalTitle: string, category: string, mood: string | null) => {
    const taskTemplates = {
      health: [
        { title: "Plan your nutrition for the week", description: "Create a meal plan that supports your health goals" },
        { title: "Schedule 3 workout sessions", description: "Block time in your calendar for physical activity" },
        { title: "Track your daily habits", description: "Monitor progress on key health behaviors" }
      ],
      creative: [
        { title: "Brainstorm 10 new ideas", description: "Let your creativity flow without judgment" },
        { title: "Create a rough draft", description: "Get your ideas down on paper or screen" },
        { title: "Gather inspiration", description: "Research and collect examples that inspire you" }
      ],
      learning: [
        { title: "Set up your learning schedule", description: "Block dedicated time for focused study" },
        { title: "Find learning resources", description: "Identify books, courses, or tutorials" },
        { title: "Practice what you learn", description: "Apply new knowledge through exercises" }
      ],
      personal: [
        { title: "Break down your goal into steps", description: "Create a clear action plan" },
        { title: "Identify potential obstacles", description: "Plan how to overcome challenges" },
        { title: "Set up accountability", description: "Find ways to track and maintain motivation" }
      ]
    };

    const moodAdjustments = {
      energized: (tasks: any[]) => tasks.map(task => ({ ...task, title: `Power through: ${task.title}` })),
      focused: (tasks: any[]) => tasks,
      tired: (tasks: any[]) => tasks.map(task => ({ ...task, title: `Gentle step: ${task.title.toLowerCase()}` })),
      stressed: (tasks: any[]) => tasks.map(task => ({ ...task, title: `Calm approach: ${task.title.toLowerCase()}` })),
      burnout: (tasks: any[]) => tasks.map(task => ({ ...task, title: `Small win: ${task.title.toLowerCase()}` }))
    };

    let baseTasks = taskTemplates[category as keyof typeof taskTemplates] || taskTemplates.personal;
    
    if (mood && moodAdjustments[mood as keyof typeof moodAdjustments]) {
      baseTasks = moodAdjustments[mood as keyof typeof moodAdjustments](baseTasks);
    }

    return baseTasks;
  };

  return (
    <Button
      onClick={generateTasks}
      disabled={isGenerating}
      size="sm"
      variant="outline"
      className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
    >
      {isGenerating ? (
        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4 mr-2" />
      )}
      {isGenerating ? 'Generating...' : 'Generate AI Tasks'}
    </Button>
  );
};

export default AITaskGenerator;
