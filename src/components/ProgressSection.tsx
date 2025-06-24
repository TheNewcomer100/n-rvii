
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, TrendingUp } from "lucide-react";
import { Goal } from './Dashboard';

interface ProgressSectionProps {
  goals: Goal[];
  completedTasks: string[];
  streak: number;
}

const ProgressSection = ({ goals, completedTasks, streak }: ProgressSectionProps) => {
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);
  
  // Calculate today's progress
  const todaysTasks = 3; // This would be dynamic based on suggested tasks
  const todaysProgress = Math.min((completedTasks.length / todaysTasks) * 100, 100);
  
  // Calculate weekly progress (continuous tracking without Monday reset)
  const weeklyTasksCompleted = 8; // This would track actual completed tasks over time
  const weeklyTasksTotal = 15;
  const weeklyProgress = (weeklyTasksCompleted / weeklyTasksTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tasks Completed</span>
              <span className="font-medium text-gray-800">
                {completedTasks.length}/{todaysTasks}
              </span>
            </div>
            <Progress value={todaysProgress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-gray-800">{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
            <p className="text-xs text-blue-600">✨ Keep building your momentum!</p>
          </div>
        </CardContent>
      </Card>

      {/* Streaks & Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Your Journey</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Check-in Streak</p>
                <p className="text-sm text-gray-600">
                  {streak === 0 ? 'Start your first check-in!' : 'Consecutive days of growth'}
                </p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              {streak} days
            </Badge>
          </div>

          {completedGoals.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 text-sm">Completed Goals</h4>
              {completedGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span>{goal.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* Continuous Progress Info */}
          <div className="p-3 bg-blue-50 rounded-2xl">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <Flame className="w-4 h-4" />
              <span className="font-medium">Streak continues until a day is missed</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Your progress builds continuously - no weekly resets!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Analytics */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Personal Insights
          </CardTitle>
          <CardDescription>
            Your patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600">{goals.length}</div>
              <div className="text-xs text-gray-600">Goals Set</div>
            </div>
            <div className="p-3 bg-green-50 rounded-2xl">
              <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-xs text-gray-600">Tasks Today</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressSection;
