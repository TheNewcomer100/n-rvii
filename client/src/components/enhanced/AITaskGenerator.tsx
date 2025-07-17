
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from '@tanstack/react-query';

interface AITaskGeneratorProps {
  goalId: string;
  mood: string | null;
  goalCategory: string;
  goalTitle: string;
  onTasksGenerated: (tasks: any[]) => void;
}

const AITaskGenerator = ({ goalId, mood, goalCategory, goalTitle, onTasksGenerated }: AITaskGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTasksMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/ai/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'demo-user-123',
        },
        body: JSON.stringify({
          goalTitle,
          goalCategory,
          mood,
          goalId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate tasks');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
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
    },
    onError: (error) => {
      console.error('Error generating AI tasks:', error);
      toast({
        title: "Error generating tasks",
        description: "Failed to generate AI tasks. Please try again.",
        variant: "destructive"
      });
    }
  });

  const generateTasks = () => {
    generateTasksMutation.mutate();
  };

  return (
    <Button
      onClick={generateTasks}
      disabled={generateTasksMutation.isPending}
      size="sm"
      variant="outline"
      className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
    >
      {generateTasksMutation.isPending ? (
        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4 mr-2" />
      )}
      {generateTasksMutation.isPending ? 'Generating...' : 'Generate AI Tasks'}
    </Button>
  );
};

export default AITaskGenerator;
