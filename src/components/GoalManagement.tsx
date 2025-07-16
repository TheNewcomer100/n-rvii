
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, Target, CheckCircle2, Star, Heart, Sparkles, AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { Goal } from "@/types/dashboard";
import { SubscriptionTier } from "@/hooks/useSubscription";
import GoalForm from "./GoalForm";

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
  const [showAddForm, setShowAddForm] = useState(false);

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  // Sort goals by priority and date
  const sortedActiveGoals = [...activeGoals].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 2;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 2;
    if (priorityA !== priorityB) return priorityB - priorityA;
    return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
  });

  const handleGoalCreate = (goal: Goal) => {
    onGoalsChange([...goals, goal]);
    setShowAddForm(false);
  };

  const handleCompleteGoal = (goalId: string) => {
    onGoalComplete(goalId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-100 to-orange-100 border-red-200 text-red-700';
      case 'medium': return 'from-blue-100 to-purple-100 border-blue-200 text-blue-700';
      case 'low': return 'from-green-100 to-emerald-100 border-green-200 text-green-700';
      default: return 'from-gray-100 to-gray-100 border-gray-200 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
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
          <GoalForm
            onGoalCreate={handleGoalCreate}
            onCancel={() => setShowAddForm(false)}
          />
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
          {sortedActiveGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-6 bg-gradient-to-r from-white/80 to-purple-50/50 rounded-3xl border-2 border-purple-100 hover:shadow-lg transition-all duration-200 hover:border-purple-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200"></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg leading-relaxed">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 ml-6 flex-wrap gap-2">
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-2xl">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    
                    <Badge className={`bg-gradient-to-r ${getPriorityColor(goal.priority || 'medium')} text-xs font-medium px-3 py-1 flex items-center space-x-1`}>
                      {getPriorityIcon(goal.priority || 'medium')}
                      <span>{goal.priority || 'medium'} priority</span>
                    </Badge>
                    
                    <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:shadow-md text-xs font-medium px-3 py-1">
                      {goal.category}
                    </Badge>
                  </div>
                  
                  {/* SMART Goals Preview */}
                  {(goal.specific || goal.measurable || goal.achievable || goal.relevant || goal.timeBound) && (
                    <div className="ml-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                      <h5 className="text-sm font-semibold text-blue-800 mb-2 flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>SMART Framework</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                        {goal.specific && <div><strong>Specific:</strong> {goal.specific}</div>}
                        {goal.measurable && <div><strong>Measurable:</strong> {goal.measurable}</div>}
                        {goal.achievable && <div><strong>Achievable:</strong> {goal.achievable}</div>}
                        {goal.relevant && <div><strong>Relevant:</strong> {goal.relevant}</div>}
                        {goal.timeBound && <div><strong>Time-bound:</strong> {goal.timeBound}</div>}
                      </div>
                    </div>
                  )}
                  
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
