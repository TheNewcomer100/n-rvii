
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  completed: boolean;
  specific?: string;
  measurable?: string;
  achievable?: string;
  relevant?: string;
  timeBound?: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  ai_generated: boolean;
  goal_id?: string;
  mood_context?: string;
}

export const useDashboardData = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>('');

  // Mock user for demo
  const userId = 'demo-user-123';

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // Create sample data for demonstration
    const sampleGoals: Goal[] = [
      {
        id: '1',
        title: 'Exercise Daily',
        category: 'health',
        targetDate: new Date().toISOString().split('T')[0],
        completed: false,
        specific: 'Do 30 minutes of exercise each day',
        measurable: 'Track daily workout completion',
        achievable: 'Start with simple exercises',
        relevant: 'Improve physical health and energy',
        timeBound: 'Complete daily for next 30 days'
      },
      {
        id: '2',
        title: 'Learn a New Skill',
        category: 'personal',
        targetDate: new Date().toISOString().split('T')[0],
        completed: false,
        specific: 'Learn React and TypeScript',
        measurable: 'Complete online course modules',
        achievable: 'Study 1 hour per day',
        relevant: 'Advance career development',
        timeBound: 'Complete course in 6 weeks'
      }
    ];

    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Morning workout',
        description: 'Do 30 minutes of cardio',
        completed: false,
        ai_generated: true,
        goal_id: '1',
        mood_context: 'energetic'
      },
      {
        id: '2',
        title: 'Read React documentation',
        description: 'Review component lifecycle',
        completed: false,
        ai_generated: false,
        goal_id: '2'
      }
    ];

    setGoals(sampleGoals);
    setTasks(sampleTasks);
    setCompletedTasks([]);
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
