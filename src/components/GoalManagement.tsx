
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, Target, CheckCircle2, Star } from "lucide-react";
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
    <Card className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100/50 to-blue-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Your Goals
              </CardTitle>
              <CardDescription className="text-gray-600">
                {activeGoals.length} active • {completedGoals.length} completed
              </CardDescription>
            </div>
          </div>
          
          {canCreateGoal && (
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Goal
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Add Goal Form */}
        {showAddForm && (
          <div className="p-4 bg-white/60 rounded-2xl border border-purple-100 space-y-3">
            <Input
              placeholder="What would you like to achieve?"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="rounded-xl border-purple-200 focus:border-purple-400 bg-white/80"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleAddGoal}
                size="sm"
                className="rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white"
                disabled={!newGoal.trim()}
              >
                <Star className="w-4 h-4 mr-1" />
                Create Goal
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                size="sm"
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Goal Limit Warning */}
        {!canCreateGoal && (
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
            <p className="text-sm text-amber-800 font-medium">
              🎯 Goal limit reached ({currentTier.goalLimit} goals)
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Complete or upgrade to add more goals
            </p>
          </div>
        )}

        {/* Active Goals */}
        <div className="space-y-3">
          {activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 bg-white/70 rounded-2xl border border-blue-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">{goal.title}</h4>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                      {goal.category}
                    </Badge>
                  </div>
                  
                  {/* Progress placeholder */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
                
                <Button
                  onClick={() => handleCompleteGoal(goal.id)}
                  size="sm"
                  className="ml-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {activeGoals.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-600 mb-2">No active goals yet</p>
            <p className="text-sm text-gray-500">
              Start by creating your first goal to track your progress
            </p>
          </div>
        )}

        {/* Completed Goals Preview */}
        {completedGoals.length > 0 && (
          <div className="pt-4 border-t border-purple-100">
            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              Recent Achievements
            </p>
            <div className="space-y-2">
              {completedGoals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="line-through">{goal.title}</span>
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
