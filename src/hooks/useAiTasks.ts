import { useState, useEffect } from 'react';
import { generateTaskSuggestions, TaskSuggestion } from '@/lib/ai';

export function useAiTasks(mood: string | null, energyLevel: number = 3) {
  const [tasks, setTasks] = useState<TaskSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTasks = async () => {
    if (!mood) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await generateTaskSuggestions(mood, energyLevel);
      setTasks(suggestions);
    } catch (err) {
      setError('Failed to generate task suggestions');
      console.error('Error generating tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateTasks();
  }, [mood, energyLevel]);

  return {
    tasks,
    loading,
    error,
    regenerateTasks: generateTasks
  };
}