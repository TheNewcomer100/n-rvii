
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
      console.log('Calling AI task generation with:', { goalTitle, goalCategory, mood });

      // Call the AI task generation edge function
      const { data, error } = await supabase.functions.invoke('generate-ai-tasks', {
        body: {
          goalTitle,
          goalCategory,
          mood,
          userId: user.id,
          goalId
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data.success) {
        console.error('AI generation failed:', data);
        throw new Error(data.error || 'Failed to generate tasks');
      }

      console.log('AI tasks generated successfully:', data.tasks);

      // Format tasks for the frontend
      const formattedTasks = data.tasks.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: false,
        ai_generated: true,
        goal_id: task.goal_id,
        mood_context: task.mood_context
      }));

      onTasksGenerated(formattedTasks);
      
      toast({
        title: "✨ AI Tasks Generated!",
        description: `Created ${data.tasks.length} personalized tasks based on your mood and goal`
      });

    } catch (error) {
      console.error('Error generating AI tasks:', error);
      toast({
        title: "Error generating tasks",
        description: "Failed to generate AI tasks. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
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
