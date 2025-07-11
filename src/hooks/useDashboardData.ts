
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Goal, Task } from '@/types/dashboard';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load goals
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (goalsData) {
        const formattedGoals = goalsData.map(goal => ({
          id: goal.id.toString(),
          title: goal.title || goal.goal_text,
          category: goal.category || 'personal',
          targetDate: goal.date,
          completed: goal.completed || false,
          specific: goal.specific,
          measurable: goal.measurable,
          achievable: goal.achievable,
          relevant: goal.relevant,
          timeBound: goal.time_bound
        }));
        setGoals(formattedGoals);
      }

      // Load tasks with proper type mapping
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (tasksData) {
        const formattedTasks = tasksData.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          completed: task.completed || false,
          ai_generated: task.ai_generated || false,
          goal_id: task.goal_id || undefined,
          mood_context: task.mood_context || undefined
        }));
        setTasks(formattedTasks);
        const completed = formattedTasks.filter(task => task.completed).map(task => task.id);
        setCompletedTasks(completed);
      }

      // Load mood entries
      const today = new Date().toISOString().split('T')[0];
      const { data: moodData } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (moodData) {
        setCurrentMood(moodData.mood);
        setHasCheckedIn(true);
        setLastCheckInDate(new Date().toDateString());
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return {
    goals,
    setGoals,
    tasks,
    setTasks,
    completedTasks,
    setCompletedTasks,
    currentMood,
    setCurrentMood,
    hasCheckedIn,
    setHasCheckedIn,
    lastCheckInDate,
    setLastCheckInDate,
    dailyReflection,
    setDailyReflection,
    loadUserData
  };
};
