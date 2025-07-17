
import { useState } from 'react';
import SettingsPage from "./SettingsPage";
import DashboardHeader from "./dashboard/DashboardHeader";
import SickDayMode from "./dashboard/SickDayMode";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardFooter from "./dashboard/DashboardFooter";
import DashboardContent from "./dashboard/DashboardContent";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";
import CrisisSupportPage from "../pages/CrisisSupportPage";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useDashboardHandlers } from "@/hooks/useDashboardHandlers";
import { useSubscription } from "@/hooks/useSubscription";

const Dashboard = () => {
  const { currentTier, canCreateGoal } = useSubscription();
  const [streak, setStreak] = useState(0);
  const [isSickDay, setIsSickDay] = useState(false);
  const [userName, setUserName] = useState("User");
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const {
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
    setDailyReflection
  } = useDashboardData();

  const {
    handleMoodChange,
    handleTaskComplete,
    handleGoalComplete,
    handleTasksGenerated,
    handleTaskUpdate,
    handleSickDay
  } = useDashboardHandlers({
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
  });

  const activeGoals = goals.filter(goal => !goal.completed);

  const handleSickDayClick = async () => {
    setIsSickDay(true);
    await handleSickDay();
  };

  const handleNavigate = (page: string) => {
    setCurrentView(page);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Handle different views
  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} userName={userName} />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'terms') {
    return <TermsPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'crisis') {
    return <CrisisSupportPage onBack={handleBackToDashboard} />;
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
        onSickDay={handleSickDayClick}
        onShowSettings={() => setShowSettings(true)}
      />

      <DashboardContent
        currentMood={currentMood}
        goals={goals}
        tasks={tasks}
        completedTasks={completedTasks}
        streak={streak}
        dailyReflection={dailyReflection}
        canCreateGoal={canCreateGoal(activeGoals.length)}
        currentTier={currentTier}
        onMoodChange={handleMoodChange}
        onGoalsChange={setGoals}
        onGoalComplete={handleGoalComplete}
        onTaskComplete={handleTaskComplete}
        onTasksGenerated={handleTasksGenerated}
        onTaskUpdate={handleTaskUpdate}
        onReflectionChange={setDailyReflection}
      />

      <DashboardFooter onNavigate={handleNavigate} />
    </DashboardLayout>
  );
};

export default Dashboard;
