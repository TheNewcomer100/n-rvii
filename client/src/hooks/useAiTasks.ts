import { useState, useEffect } from 'react';
import { generateTasks } from '@/lib/ai';

export interface TaskSuggestion {
  id: string;
  title: string;
  tag: string;
  description?: string;
}

export function useAiTasks(mood: string | null, energyLevel: number = 3) {
  const [tasks, setTasks] = useState<TaskSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTaskSuggestions = async () => {
    if (!mood) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const prompt = `Generate 3 personalized task suggestions for someone with mood: ${mood} and energy level: ${energyLevel}/5. Include wellness, productivity, and growth activities.`;
      const suggestions = await generateTasks(prompt);
      setTasks(suggestions);
    } catch (err) {
      setError('Failed to generate task suggestions');
      console.error('Error generating tasks:', err);
      
      // Fallback tasks based on mood and energy
      const fallbackTasks = getFallbackTasks(mood, energyLevel);
      setTasks(fallbackTasks);
    } finally {
      setLoading(false);
    }
  };

  const regenerateTasks = () => {
    generateTaskSuggestions();
  };

  useEffect(() => {
    if (mood) {
      generateTaskSuggestions();
    }
  }, [mood, energyLevel]);

  return {
    tasks,
    loading,
    error,
    regenerateTasks
  };
}

function getFallbackTasks(mood: string, energyLevel: number): TaskSuggestion[] {
  const lowEnergyTasks = [
    { id: '1', title: 'Take 5 deep breaths', tag: 'Mindfulness', description: 'Simple breathing exercise' },
    { id: '2', title: 'Write down 3 gratitudes', tag: 'Wellness', description: 'Focus on positive thoughts' },
    { id: '3', title: 'Light stretching', tag: 'Physical', description: 'Gentle movement for 5 minutes' }
  ];

  const highEnergyTasks = [
    { id: '1', title: 'Plan tomorrow\'s priorities', tag: 'Productivity', description: 'Set yourself up for success' },
    { id: '2', title: 'Learn something new', tag: 'Growth', description: '15 minutes of skill building' },
    { id: '3', title: 'Organize workspace', tag: 'Environment', description: 'Create a productive space' }
  ];

  const sadMoodTasks = [
    { id: '1', title: 'Call a friend or family member', tag: 'Connection', description: 'Reach out for support' },
    { id: '2', title: 'Listen to uplifting music', tag: 'Wellness', description: 'Boost your mood naturally' },
    { id: '3', title: 'Take a warm shower or bath', tag: 'Self-care', description: 'Comfort and relaxation' }
  ];

  if (mood.toLowerCase().includes('sad') || mood.toLowerCase().includes('down')) {
    return sadMoodTasks;
  } else if (energyLevel <= 2) {
    return lowEnergyTasks;
  } else {
    return highEnergyTasks;
  }
}