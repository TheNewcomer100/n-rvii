
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, Target, CheckCircle2, Star, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Goal } from "@/types/dashboard";
import { SubscriptionTier } from "@/hooks/useSubscription";

interface GoalManagementProps {
  goals: Goal[];
  onGoalsChange: (goals: Goal[]) => void;
  onGoalComplete: (goalId: string) => void;
  canCreateGoal: boolean;
  currentTier: SubscriptionTier;
}

const GoalManagement = ({ 
  goals, 
  onGoalsChange, 
  onGoalComplete, 
  canCreateGoal,
  currentTier 
}: GoalManagementProps) => {
  const [newGoal, setNewGoal] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  const handleAddGoal = () => {
    if (newGoal.trim() && canCreateGoal) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.trim(),
        category: 'personal',
        targetDate: new Date().toISOString().split('T')[0],
        completed: false,
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timeBound: ''
      };
      
      onGoalsChange([...goals, goal]);
      setNewGoal('');
      setShowAddForm(false);
    }
  };

  const handleCompleteGoal = (goalId: string) => {
    onGoalComplete(goalId);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/90 to-green-50/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100/60 via-blue-100/60 to-green-100/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-3xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your Dreams & Goals
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                {activeGoals.length} growing • {completedGoals.length} achieved ✨
              </CardDescription>
            </div>
          </div>
          
          {canCreateGoal && (
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              className="rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white border-0 px-6 py-3 font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        {/* Add Goal Form */}
        {showAddForm && (
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl border-2 border-purple-100 space-y-4 shadow-inner">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-purple-700">What's your next dream?</h3>
            </div>
            <Input
              placeholder="Describe your goal with love and intention..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 py-4 px-4 text-gray-700 placeholder:text-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <div className="flex space-x-3">
              <Button
                onClick={handleAddGoal}
                size="sm"
                className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 font-medium shadow-lg transition-all duration-200"
                disabled={!newGoal.trim()}
              >
                <Star className="w-4 h-4 mr-2" />
                Plant This Seed
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                size="sm"
                variant="outline"
                className="rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3 font-medium transition-all duration-200"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        )}

        {/* Goal Limit Warning */}
        {!canCreateGoal && (
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 shadow-inner">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-amber-600" />
              <p className="font-bold text-amber-800">
                Goal garden is full! ({currentTier.goalLimit} goals)
              </p>
            </div>
            <p className="text-amber-700 leading-relaxed">
              Complete some goals or upgrade to plant more seeds of growth 🌱
            </p>
          </div>
        )}

        {/* Active Goals */}
        <div className="space-y-4">
          {activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-6 bg-gradient-to-r from-white/80 to-purple-50/50 rounded-3xl border-2 border-purple-100 hover:shadow-lg transition-all duration-200 hover:border-purple-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200"></div>
                    <h4 className="font-bold text-gray-800 text-lg leading-relaxed">{goal.title}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 ml-6">
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-2xl">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:shadow-md text-xs font-medium px-3 py-1">
                      {goal.category}
                    </Badge>
                  </div>
                  
                  {/* Progress */}
                  <div className="ml-6 space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="font-medium">Growth Progress</span>
                      <span className="font-bold">25%</span>
                    </div>
                    <Progress value={25} className="h-3 bg-purple-100" />
                    <p className="text-xs text-purple-600 font-medium">🌱 Seeds are sprouting!</p>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleCompleteGoal(goal.id)}
                  size="sm"
                  className="ml-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Celebrate!
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {activeGoals.length === 0 && (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
              <Target className="w-10 h-10 text-purple-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 text-lg font-medium">Your goal garden awaits</p>
              <p className="text-gray-500 leading-relaxed max-w-md mx-auto">
                Plant the seeds of your dreams and watch them grow with intention and care 🌱
              </p>
            </div>
          </div>
        )}

        {/* Completed Goals Preview */}
        {completedGoals.length > 0 && (
          <div className="pt-6 border-t-2 border-purple-100">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              <p className="font-bold text-gray-700">Recent Celebrations</p>
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div className="space-y-3">
              {completedGoals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-500" fill="currentColor" />
                  <span className="line-through font-medium">{goal.title}</span>
                  <div className="flex space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
