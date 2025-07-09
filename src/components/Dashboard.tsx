
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
import { toast } from "@/hooks/use-toast";

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

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [isSickDay, setIsSickDay] = useState(false);
  const [userName, setUserName] = useState("User");
  const [showSettings, setShowSettings] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>('');

  const getTodayDateString = () => {
    return new Date().toDateString();
  };

  const handleMoodChange = (mood: string) => {
    const today = getTodayDateString();
    
    // Only increment streak if it's a new day and user hasn't checked in today
    if (lastCheckInDate !== today) {
      setCurrentMood(mood);
      setHasCheckedIn(true);
      setLastCheckInDate(today);
      
      // Only increment streak if user has completed at least one task
      if (completedTasks.length > 0) {
        setStreak(prev => prev + 1);
      }
    } else {
      // Just update mood if already checked in today
      setCurrentMood(mood);
    }
  };

  const handleTaskComplete = (tasks: string[]) => {
    setCompletedTasks(tasks);
    
    // If user has checked in today and this is their first task completion, increment streak
    if (hasCheckedIn && lastCheckInDate === getTodayDateString() && completedTasks.length === 0 && tasks.length > 0) {
      setStreak(prev => prev + 1);
    }
  };

  const handleGoalComplete = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));
    
    // Trigger confetti animation
    toast({
      title: "🎉 Goal Completed!",
      description: "You've accomplished something wonderful. Take a moment to celebrate.",
    });
  };

  const handleSickDay = () => {
    setIsSickDay(true);
    // Sick day pauses streak but doesn't reset it
    toast({
      title: "💙 Taking Care of Yourself",
      description: "Your wellbeing comes first. Rest easy knowing your streak is safe.",
    });
  };

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
            />
          </div>

          {/* Right Column - Tasks and Progress */}
          <div className="lg:col-span-2 space-y-6">
            <TaskSuggestions 
              mood={currentMood}
              goals={goals}
              completedTasks={completedTasks}
              onTaskComplete={handleTaskComplete}
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
