
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, TrendingUp, Trophy, Zap } from "lucide-react";
import { Goal } from '@/types/dashboard';

interface ProgressSectionProps {
  goals: Goal[];
  completedTasks: string[];
  streak: number;
}

const ProgressSection = ({ goals, completedTasks, streak }: ProgressSectionProps) => {
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);
  
  // Calculate today's progress - show encouraging starting progress
  const todaysTasks = Math.max(3, completedTasks.length + 1);
  const todaysProgress = Math.min((completedTasks.length / todaysTasks) * 100, 100);
  
  // Calculate overall progress with encouraging baseline
  const totalGoals = Math.max(goals.length, 1);
  const completedGoalsCount = goals.filter(g => g.completed).length;
  const baseProgress = goals.length === 0 ? 15 : 0; // Give new users encouraging start
  const weeklyProgress = Math.min(baseProgress + (completedGoalsCount / totalGoals) * 85, 100);

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <Card className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-100/50 to-purple-100/50">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span>Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Tasks Completed</span>
              <span className="font-bold text-gray-800 bg-blue-100 px-2 py-1 rounded-lg">
                {completedTasks.length}/{todaysTasks}
              </span>
            </div>
            <Progress value={todaysProgress} className="h-3 bg-blue-100" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Overall Progress</span>
              <span className="font-bold text-gray-800 bg-purple-100 px-2 py-1 rounded-lg">
                {Math.round(weeklyProgress)}%
              </span>
            </div>
            <Progress value={weeklyProgress} className="h-3 bg-purple-100" />
            <p className="text-xs text-purple-600 font-medium bg-purple-50 px-3 py-2 rounded-xl">
              ✨ Keep building your momentum!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Streaks & Achievements */}
      <Card className="bg-gradient-to-br from-orange-50/80 to-yellow-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-100/50 to-yellow-100/50">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span>Your Journey</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Check-in Streak</p>
                <p className="text-sm text-gray-600">
                  {streak === 0 ? 'Start your first check-in!' : 'Consecutive days of growth'}
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:shadow-lg text-lg font-bold px-4 py-2">
              {streak} days
            </Badge>
          </div>

          {completedGoals.length > 0 && (
            <div className="space-y-3 p-4 bg-white/60 rounded-2xl border border-yellow-200">
              <h4 className="font-bold text-gray-800 text-sm flex items-center">
                <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                Completed Goals
              </h4>
              {completedGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2 text-sm text-gray-700 bg-yellow-50 p-2 rounded-xl">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span className="font-medium">{goal.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* Continuous Progress Info */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-center space-x-2 text-sm text-blue-800 font-medium">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Streak continues until a day is missed</span>
            </div>
            <p className="text-xs text-blue-600 mt-2 bg-blue-100 px-2 py-1 rounded-lg">
              🌱 Your progress builds continuously - no weekly resets!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Analytics */}
      <Card className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-100/50 to-emerald-100/50">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span>Personal Insights</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-1">{goals.length}</div>
              <div className="text-xs text-gray-600 font-medium">Goals Set</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-1">{completedTasks.length}</div>
              <div className="text-xs text-gray-600 font-medium">Tasks Today</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressSection;
