
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Settings, Star, CheckCircle2, Flame } from "lucide-react";
import MoodCheckIn from "./MoodCheckIn";
import GoalManagement from "./GoalManagement";
import TaskSuggestions from "./TaskSuggestions";
import ProgressSection from "./ProgressSection";
import SettingsPage from "./SettingsPage";
import DailyReflection from "./DailyReflection";
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
  const [streak, setStreak] = useState(0); // Always start at 0
  const [isSickDay, setIsSickDay] = useState(false);
  const [userName] = useState("Alex");
  const [showSettings, setShowSettings] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [dailyReflection, setDailyReflection] = useState<string>('');

  const welcomeMessages = [
    "Welcome back, {name}. Let's nurture your focus today.",
    "Hello, {name}. Ready to tend to your dreams?",
    "Good to see you, {name}. Your journey continues here.",
    "Welcome, {name}. Let's create something beautiful today."
  ];

  const getWelcomeMessage = () => {
    const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    return message.replace('{name}', userName);
  };

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    setHasCheckedIn(true);
    // Update streak only after first check-in and task completion
    if (completedTasks.length > 0) {
      setStreak(prev => prev + 1);
    }
  };

  const handleTaskComplete = (tasks: string[]) => {
    setCompletedTasks(tasks);
    // Update streak if user has checked in and completed at least one task
    if (hasCheckedIn && tasks.length > 0 && completedTasks.length === 0) {
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
    toast({
      title: "💙 Taking Care of Yourself",
      description: "Your wellbeing comes first. Rest easy knowing your streak is safe.",
    });
  };

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} userName={userName} />;
  }

  if (isSickDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-2xl mx-auto space-y-8 pt-12">
          <Card className="text-center p-8 bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Rest & Restore</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Take all the time you need. Your goals will be here when you're ready, 
                and your streak stays protected.
              </p>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm text-blue-800">
                  💙 Gentle self-care suggestions: Take a warm bath, listen to calming music, 
                  or simply rest without guilt.
                </p>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => setIsSickDay(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  I'm Ready to Return
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/8c5d43a0-4c58-4d1f-a419-36dd96f5f908.png" 
                alt="Nrvii Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Nrvii</h1>
                <p className="text-sm text-gray-600">{getWelcomeMessage()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">{streak} days</span>
              </div>
              <Button
                onClick={handleSickDay}
                variant="outline"
                size="sm"
                className="rounded-xl text-gray-600 border-gray-200 hover:bg-gray-50"
              >
                Sick Day
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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

        {/* Footer */}
        <footer className="mt-16 py-8 text-center space-y-4">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Help Center</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Community</a>
            <a href="#" className="hover:text-gray-700 transition-colors font-medium">Crisis Support</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Press Kit</a>
          </div>
          <p className="text-xs text-gray-400 italic">
            "Your journey matters. Every small step counts."
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
