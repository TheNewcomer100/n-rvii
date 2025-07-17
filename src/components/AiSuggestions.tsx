// src/components/AiSuggestions.tsx
import React from 'react';
import { useAiTasks } from '../hooks/useAiTasks';
import { supabase } from '../integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

interface AiSuggestionsProps {
  moodScore: number;
  energyLevel: number;
}

export const AiSuggestions: React.FC<AiSuggestionsProps> = ({
  moodScore,
  energyLevel,
}) => {
  const { tasks, loading, error } = useAiTasks(moodScore, energyLevel);
  const { user } = useAuth();

  if (loading) return <p className="text-center">Loading AI tasks...</p>;
  if (error) return <p className="text-red-500">AI Error: {error}</p>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <span className="text-sm text-muted-foreground">{task.tag}</span>
          <Button
            className="mt-2"
            onClick={async () => {
              await supabase.from('tasks').upsert({
                user_id: user?.id,
                title: task.title,
                tag: task.tag,
                ai_generated: true,
              });
            }}
          >
            Add to My Tasks
          </Button>
        </Card>
      ))}
    </div>
  );
};
