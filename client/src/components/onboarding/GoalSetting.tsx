
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, X, Heart, Briefcase, User, Book } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

interface GoalSettingProps {
  onNext: (goals: Goal[]) => void;
  onBack: () => void;
}

const GoalSetting = ({ onNext, onBack }: GoalSettingProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const categories = [
    { id: 'personal', label: 'Personal Growth', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { id: 'career', label: 'Career & Work', icon: Briefcase, color: 'bg-blue-100 text-blue-700' },
    { id: 'health', label: 'Health & Wellness', icon: User, color: 'bg-green-100 text-green-700' },
    { id: 'learning', label: 'Learning & Skills', icon: Book, color: 'bg-purple-100 text-purple-700' }
  ];

  const addGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.trim(),
        category: selectedCategory,
        priority: selectedPriority
      };
      setGoals([...goals, goal]);
      setNewGoal('');
    }
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleNext = () => {
    onNext(goals);
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Set Your Intentions</h1>
          <p className="text-gray-600">
            What would you like to focus on? Start with 1-3 goals - you can always add more later.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 text-center">
              Your Goals & Intentions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Goal */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-2xl">
              <Label className="text-gray-700 font-medium">Add a new goal</Label>
              
              <Input
                placeholder="e.g., Exercise 3 times per week, Learn Spanish, Write a book..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-blue-400"
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Category</Label>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="grid grid-cols-2 gap-2"
                  >
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <div key={category.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={category.id} id={category.id} />
                          <Label 
                            htmlFor={category.id} 
                            className="text-xs cursor-pointer flex items-center gap-1"
                          >
                            <IconComponent className="w-3 h-3" />
                            {category.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Priority</Label>
                  <RadioGroup
                    value={selectedPriority}
                    onValueChange={(value) => setSelectedPriority(value as 'low' | 'medium' | 'high')}
                    className="flex gap-4"
                  >
                    {[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ].map((priority) => (
                      <div key={priority.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={priority.value} id={priority.value} />
                        <Label htmlFor={priority.value} className="text-xs cursor-pointer">
                          {priority.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <Button
                onClick={addGoal}
                disabled={!newGoal.trim()}
                className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </Button>
            </div>

            {/* Goals List */}
            {goals.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Your Goals ({goals.length})</h3>
                <div className="space-y-3">
                  {goals.map((goal) => {
                    const categoryInfo = getCategoryInfo(goal.category);
                    const IconComponent = categoryInfo.icon;
                    return (
                      <div
                        key={goal.id}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${categoryInfo.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{goal.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {categoryInfo.label}
                              </Badge>
                              <Badge 
                                variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {goal.priority} priority
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeGoal(goal.id)}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {goals.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Add your first goal above to get started!</p>
              </div>
            )}

            <div className="bg-green-50 p-4 rounded-2xl">
              <p className="text-sm text-green-800">
                💚 <strong>Remember:</strong> Goals are intentions, not pressure. 
                We'll help you break these down into manageable steps that honor your energy levels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={onBack}
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                {goals.length > 0 ? `Continue with ${goals.length} goal${goals.length > 1 ? 's' : ''}` : 'Skip for now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalSetting;
