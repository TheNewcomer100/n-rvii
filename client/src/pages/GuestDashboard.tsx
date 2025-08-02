import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Smile, Target, Plus, AlertTriangle, BookOpen } from "lucide-react";
import MoodCheckIn from "@/components/MoodCheckIn";
import DailyReflection from "@/components/DailyReflection";

interface Goal {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  progress: number;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

const GuestDashboard = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });
  const { toast } = useToast();

  const handleMoodChange = async (mood: string) => {
    setCurrentMood(mood);
    // For guest mode, just store in local state
    localStorage.setItem('guest_mood', mood);
  };

  const handleAddGoal = () => {
    if (goals.length >= 2) {
      toast({
        title: "Goal limit reached",
        description: "Guest users can create up to 2 goals. Upgrade to create unlimited goals!",
        variant: "destructive"
      });
      return;
    }

    if (!newGoal.title || !newGoal.specific) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the title and specific criteria",
        variant: "destructive"
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      priority: newGoal.priority,
      progress: 0,
      specific: newGoal.specific,
      measurable: newGoal.measurable,
      achievable: newGoal.achievable,
      relevant: newGoal.relevant,
      timeBound: newGoal.timeBound
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      priority: 'Medium',
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    });
    setShowGoalForm(false);

    toast({
      title: "Goal created!",
      description: "Your SMART goal has been added successfully."
    });
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress } : goal
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    // Load guest mood from localStorage
    const savedMood = localStorage.getItem('guest_mood');
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Guest Mode Banner */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-amber-800 font-medium">
                  You're in Guest Mode - Limited to 2 goals
                </p>
                <p className="text-amber-600 text-sm">
                  Sign up for unlimited goals, AI suggestions, and more features!
                </p>
              </div>
              <Button 
                size="sm" 
                className="ml-auto bg-amber-600 hover:bg-amber-700"
                onClick={() => window.location.href = '/beta-signup'}
              >
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Check-in */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-800">
                <Smile className="w-5 h-5" />
                <span>How are you feeling today?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MoodCheckIn currentMood={currentMood} onMoodChange={handleMoodChange} />
            </CardContent>
          </Card>

          {/* Goals Section */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-purple-800">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>SMART Goals ({goals.length}/2)</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowGoalForm(true)}
                  disabled={goals.length >= 2}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Goal
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 bg-white/50 rounded-xl border border-white/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={goal.progress}
                      onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}

              {goals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No goals yet. Create your first SMART goal!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Goal Form Modal */}
        {showGoalForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
              <CardHeader>
                <CardTitle>Create a SMART Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="Goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as 'Low' | 'Medium' | 'High'})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">SMART Criteria:</h4>
                  <Input
                    placeholder="Specific: What exactly do you want to achieve?"
                    value={newGoal.specific}
                    onChange={(e) => setNewGoal({...newGoal, specific: e.target.value})}
                  />
                  <Input
                    placeholder="Measurable: How will you track progress?"
                    value={newGoal.measurable}
                    onChange={(e) => setNewGoal({...newGoal, measurable: e.target.value})}
                  />
                  <Input
                    placeholder="Achievable: Is this realistic?"
                    value={newGoal.achievable}
                    onChange={(e) => setNewGoal({...newGoal, achievable: e.target.value})}
                  />
                  <Input
                    placeholder="Relevant: Why does this matter?"
                    value={newGoal.relevant}
                    onChange={(e) => setNewGoal({...newGoal, relevant: e.target.value})}
                  />
                  <Input
                    placeholder="Time-bound: When will you complete this?"
                    value={newGoal.timeBound}
                    onChange={(e) => setNewGoal({...newGoal, timeBound: e.target.value})}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddGoal} className="flex-1">
                    Create Goal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowGoalForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Daily Reflection */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <BookOpen className="w-5 h-5" />
              <span>Daily Reflection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="How was your day? What are you grateful for?" 
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestDashboard;