
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEncouragement } from '@/components/enhanced/EncouragementSystem';
import { Goal, Task } from '@/types/dashboard';

interface UseDashboardHandlersProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  completedTasks: string[];
  setCompletedTasks: (tasks: string[]) => void;
  setCurrentMood: (mood: string) => void;
  hasCheckedIn: boolean;
  setHasCheckedIn: (checked: boolean) => void;
  lastCheckInDate: string | null;
  setLastCheckInDate: (date: string) => void;
  streak: number;
  setStreak: (streak: number) => void;
}

export const useDashboardHandlers = ({
  goals,
  setGoals,
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
  setCurrentMood,
  hasCheckedIn,
  setHasCheckedIn,
  lastCheckInDate,
  setLastCheckInDate,
  streak,
  setStreak
}: UseDashboardHandlersProps) => {
  const { user } = useAuth();
  const { showEncouragement } = useEncouragement();

  const getTodayDateString = () => {
    return new Date().toDateString();
  };

  const handleMoodChange = async (mood: string) => {
    const today = getTodayDateString();
    
    // Save mood to database
    if (user) {
      try {
        const { error } = await supabase
          .from('mood_entries')
          .upsert({
            user_id: user.id,
            date: new Date().toISOString().split('T')[0],
            mood: mood
          });

        if (error) throw error;
      } catch (error) {
        console.error('Error saving mood:', error);
      }
    }
    
    // Only increment streak if it's a new day and user hasn't checked in today
    if (lastCheckInDate !== today) {
      setCurrentMood(mood);
      setHasCheckedIn(true);
      setLastCheckInDate(today);
      
      // Show encouragement for mood check-in
      showEncouragement('mood_checkin');
      
      // Only increment streak if user has completed at least one task
      if (completedTasks.length > 0) {
        setStreak(prev => prev + 1);
      }
    } else {
      // Just update mood if already checked in today
      setCurrentMood(mood);
    }
  };

  const handleTaskComplete = async (taskIds: string[]) => {
    const previousCompletedCount = completedTasks.length;
    setCompletedTasks(taskIds);
    
    // Update tasks in database
    if (user) {
      try {
        // Mark tasks as completed/uncompleted
        for (const task of tasks) {
          const shouldBeCompleted = taskIds.includes(task.id);
          if (task.completed !== shouldBeCompleted) {
            await supabase
              .from('tasks')
              .update({ completed: shouldBeCompleted })
              .eq('id', task.id);
          }
        }

        // Update local state
        setTasks(prev => prev.map(task => ({
          ...task,
          completed: taskIds.includes(task.id)
        })));

      } catch (error) {
        console.error('Error updating tasks:', error);
      }
    }
    
    // Show encouragement for task completion
    if (taskIds.length > previousCompletedCount) {
      showEncouragement('task_complete');
    }
    
    // If user has checked in today and this is their first task completion, increment streak
    if (hasCheckedIn && lastCheckInDate === getTodayDateString() && previousCompletedCount === 0 && taskIds.length > 0) {
      setStreak(prev => prev + 1);
    }
  };

  const handleGoalComplete = async (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));
    
    // Update in database
    if (user) {
      try {
        await supabase
          .from('goals')
          .update({ completed: true })
          .eq('id', parseInt(goalId));
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    }
    
    // Show encouragement for goal completion
    showEncouragement('goal_complete');
  };

  const handleTasksGenerated = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks]);
  };

  const handleTaskUpdate = async (taskId: string, newTitle: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    ));

    // Update in database
    if (user) {
      try {
        await supabase
          .from('tasks')
          .update({ title: newTitle })
          .eq('id', taskId);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleSickDay = async () => {
    // Show encouragement for taking care of themselves
    showEncouragement('sick_day');
  };

  return {
    handleMoodChange,
    handleTaskComplete,
    handleGoalComplete,
    handleTasksGenerated,
    handleTaskUpdate,
    handleSickDay
  };
};
