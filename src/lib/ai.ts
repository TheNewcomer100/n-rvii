import { supabase } from '@/integrations/supabase/client';

export interface TaskSuggestion {
  id: string;
  title: string;
  tag: string;
}

export async function generateTaskSuggestions(
  mood: string,
  energyLevel: number
): Promise<TaskSuggestion[]> {
  try {
    const moodScore = getMoodScore(mood);
    
    const { data, error } = await supabase
      .rpc('get_suggested_tasks', {
        mood_score: moodScore,
        energy_level: energyLevel
      });

    if (error) {
      console.error('Error fetching task suggestions:', error);
      return getDefaultTasks();
    }

    return data || getDefaultTasks();
  } catch (error) {
    console.error('Error generating task suggestions:', error);
    return getDefaultTasks();
  }
}

function getMoodScore(mood: string): number {
  const moodMap: Record<string, number> = {
    terrible: 1,
    bad: 2,
    okay: 3,
    good: 4,
    great: 5
  };
  return moodMap[mood.toLowerCase()] || 3;
}

function getDefaultTasks(): TaskSuggestion[] {
  return [
    { id: '1', title: 'Take a 5-minute break', tag: 'Mindfulness' },
    { id: '2', title: 'Write down 3 things you\'re grateful for', tag: 'Mindfulness' },
    { id: '3', title: 'Do some light stretching', tag: 'Wellness' }
  ];
}