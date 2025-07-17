
import { Dispatch, SetStateAction } from 'react';

interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface UseDashboardHandlersProps {
  goals: Goal[];
  setGoals: Dispatch<SetStateAction<Goal[]>>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  completedTasks: string[];
  setCompletedTasks: Dispatch<SetStateAction<string[]>>;
  setCurrentMood: Dispatch<SetStateAction<string | null>>;
  hasCheckedIn: boolean;
  setHasCheckedIn: Dispatch<SetStateAction<boolean>>;
  lastCheckInDate: string | null;
  setLastCheckInDate: Dispatch<SetStateAction<string | null>>;
  streak: number;
  setStreak: Dispatch<SetStateAction<number>>;
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
  const showEncouragement = (type: string) => {
    console.log(`Encouragement: ${type}`);
  };

  const getTodayDateString = () => {
    return new Date().toDateString();
  };

  const handleMoodChange = async (mood: string) => {
    const today = getTodayDateString();
    
    // Mock mood saving
    console.log('Saving mood:', mood);
    
    // Only increment streak if it's a new day and user hasn't checked in today
    if (lastCheckInDate !== today) {
      setCurrentMood(mood);
      setHasCheckedIn(true);
      setLastCheckInDate(today);
      
      // Show encouragement for mood check-in
      showEncouragement('mood_checkin');
      
      // Only increment streak if user has completed at least one task
      if (completedTasks.length > 0) {
        setStreak((prevStreak: number) => prevStreak + 1);
      }
    } else {
      // Just update mood if already checked in today
      setCurrentMood(mood);
    }
  };

  const handleTaskComplete = async (taskIds: string[]) => {
    const previousCompletedCount = completedTasks.length;
    setCompletedTasks(taskIds);
    
    // Mock task updates
    console.log('Updating tasks:', taskIds);
    
    // Update local state
    setTasks((prevTasks: Task[]) => prevTasks.map(task => ({
      ...task,
      completed: taskIds.includes(task.id)
    })));
    
    // Show encouragement for task completion
    if (taskIds.length > previousCompletedCount) {
      showEncouragement('task_complete');
    }
    
    // If user has checked in today and this is their first task completion, increment streak
    if (hasCheckedIn && lastCheckInDate === getTodayDateString() && previousCompletedCount === 0 && taskIds.length > 0) {
      setStreak((prevStreak: number) => prevStreak + 1);
    }
  };

  const handleGoalComplete = async (goalId: string) => {
    setGoals((prevGoals: Goal[]) => prevGoals.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));
    
    // Mock goal update
    console.log('Completing goal:', goalId);
    
    // Show encouragement for goal completion
    showEncouragement('goal_complete');
  };

  const handleTasksGenerated = (newTasks: Task[]) => {
    setTasks((prevTasks: Task[]) => [...prevTasks, ...newTasks]);
  };

  const handleTaskUpdate = async (taskId: string, newTitle: string) => {
    setTasks((prevTasks: Task[]) => prevTasks.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    ));

    // Mock task update
    console.log('Updating task:', taskId, newTitle);
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
