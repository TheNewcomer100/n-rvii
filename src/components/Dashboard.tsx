
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
import { toast } from "@/hooks/use-toast";

export interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  completed: boolean;
}

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState(7);
  const [isSickDay, setIsSickDay] = useState(false);
  const [userName] = useState("Alex"); // Would come from auth

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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
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
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Mood Check-In */}
        <MoodCheckIn 
          currentMood={currentMood} 
          onMoodChange={setCurrentMood} 
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
              onTaskComplete={setCompletedTasks}
            />
            
            <ProgressSection 
              goals={goals}
              completedTasks={completedTasks}
              streak={streak}
            />
          </div>
        </div>

        {/* Well-Being Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Daily Reflection</CardTitle>
            <CardDescription>How are you feeling about today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              {['😊', '😌', '😐', '😔', '😴'].map((emoji, index) => (
                <button
                  key={index}
                  className="w-12 h-12 text-2xl hover:scale-110 transition-transform duration-200 rounded-xl hover:bg-gray-50"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

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
    </div>
  );
};

export default Dashboard;
