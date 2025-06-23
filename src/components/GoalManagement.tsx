
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, Star, Calendar } from "lucide-react";
import { Goal } from './Dashboard';

interface GoalManagementProps {
  goals: Goal[];
  onGoalsChange: (goals: Goal[]) => void;
  onGoalComplete: (goalId: string) => void;
}

const GoalManagement = ({ goals, onGoalsChange, onGoalComplete }: GoalManagementProps) => {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: '',
    targetDate: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        category: newGoal.category,
        targetDate: newGoal.targetDate,
        completed: false,
        specific: newGoal.specific,
        measurable: newGoal.measurable,
        achievable: newGoal.achievable,
        relevant: newGoal.relevant,
        timeBound: newGoal.timeBound
      };
      
      onGoalsChange([...goals, goal]);
      setNewGoal({ 
        title: '', 
        category: '', 
        targetDate: '',
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timeBound: ''
      });
      setIsAddingGoal(false);
    }
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const canAddGoal = activeGoals.length < 2;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Your Current Goals
            </CardTitle>
            <CardDescription className="text-gray-600">
              Focus on what matters most
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {activeGoals.length}/2
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeGoals.map((goal) => (
          <div
            key={goal.id}
            className="p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <h4 className="font-medium text-gray-800">{goal.title}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {goal.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {goal.relevant && (
                  <p className="text-xs text-gray-500 mt-1">Why: {goal.relevant}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onGoalComplete(goal.id)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {activeGoals.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Ready to set your first goal?</p>
          </div>
        )}

        {canAddGoal ? (
          <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <DialogTrigger asChild>
              <Button 
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create a SMART Goal</DialogTitle>
                <DialogDescription>
                  Let's make your goal Specific, Measurable, Achievable, Relevant, and Time-bound
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Launch my creative project"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Creative, Health, Learning"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specific">Specific - What exactly do you want to accomplish?</Label>
                  <Textarea
                    id="specific"
                    placeholder="Be specific about what you want to achieve..."
                    value={newGoal.specific}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, specific: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="measurable">Measurable - How will you track progress?</Label>
                  <Textarea
                    id="measurable"
                    placeholder="What metrics or milestones will you use?"
                    value={newGoal.measurable}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, measurable: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="achievable">Achievable - Is this realistic for you right now?</Label>
                  <Textarea
                    id="achievable"
                    placeholder="Consider your current resources and constraints..."
                    value={newGoal.achievable}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, achievable: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="relevant">Relevant - Why does this goal matter to you?</Label>
                  <Textarea
                    id="relevant"
                    placeholder="How does this align with your values and long-term vision?"
                    value={newGoal.relevant}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, relevant: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="targetDate">Time-bound - When will you complete this?</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <Button 
                  onClick={handleAddGoal}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <p className="text-sm text-blue-800 font-medium">
              You're focusing on what matters most. ✨
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Complete a goal to add another
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
