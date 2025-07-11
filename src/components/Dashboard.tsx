
import { useState, useEffect } from 'react';
import MoodCheckIn from "./MoodCheckIn";
import GoalManagement from "./GoalManagement";
import TaskSuggestions from "./TaskSuggestions";
import ProgressSection from "./ProgressSection";
import SettingsPage from "./SettingsPage";
import DailyReflection from "./DailyReflection";
import DashboardHeader from "./dashboard/DashboardHeader";
import SickDayMode from "./dashboard/SickDayMode";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardFooter from "./dashboard/DashboardFooter";
import { useEncouragement } from "./enhanced/EncouragementSystem";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Goal {
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

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  ai_generated: boolean;
  goal_id?: string;
  mood_context?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { showEncouragement } = useEncouragement();
  const { currentTier, canCreateGoal } = useSubscription();
  
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [isSickDay, setIsSickDay] = useState(false);
  const [userName, setUserName] = useState("User");
  const [showSettings, setShowSettings] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>('');

  // Load data from Supabase
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

      // Load tasks
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (tasksData) {
        const formattedTasks = tasksData.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed || false,
          ai_generated: task.ai_generated || false,
          goal_id: task.goal_id,
          mood_context: task.mood_context
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

  const handleSickDay = async () => {
    setIsSickDay(true);
    
    // Show encouragement for taking care of themselves
    showEncouragement('sick_day');
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

  const activeGoals = goals.filter(goal => !goal.completed);

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} userName={userName} />;
  }

  if (isSickDay) {
    return <SickDayMode onReturn={() => setIsSickDay(false)} />;
  }

  return (
    <DashboardLayout>
      <DashboardHeader 
        userName={userName}
        streak={streak}
        goalCount={activeGoals.length}
        goalLimit={currentTier.goalLimit}
        onSickDay={handleSickDay}
        onShowSettings={() => setShowSettings(true)}
      />

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Mood Check-In - Always at top */}
        <MoodCheckIn 
          currentMood={currentMood} 
          onMoodChange={handleMoodChange} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Goals */}
          <div className="lg:col-span-1 space-y-6">
            <GoalManagement 
              goals={goals} 
              onGoalsChange={setGoals}
              onGoalComplete={handleGoalComplete}
              canCreateGoal={canCreateGoal(activeGoals.length)}
              currentTier={currentTier}
            />
          </div>

          {/* Right Column - Tasks and Progress */}
          <div className="lg:col-span-2 space-y-6">
            <TaskSuggestions 
              mood={currentMood}
              goals={goals}
              tasks={tasks}
              completedTasks={completedTasks}
              onTaskComplete={handleTaskComplete}
              onTasksGenerated={handleTasksGenerated}
              onTaskUpdate={handleTaskUpdate}
            />
            
            <ProgressSection 
              goals={goals}
              completedTasks={completedTasks}
              streak={streak}
            />
          </div>
        </div>

        {/* Daily Reflection */}
        <DailyReflection 
          reflection={dailyReflection}
          onReflectionChange={setDailyReflection}
          canReflect={completedTasks.length > 0}
        />

        <DashboardFooter />
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
