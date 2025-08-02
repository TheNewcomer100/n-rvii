import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePieChartData } from '@/hooks/usePieChartData';
import { useAiTasks } from '@/hooks/useAiTasks';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import MoodCheckIn from '@/components/MoodCheckIn';
import PieChart from '@/components/PieChart';
import SickDayMode from '@/components/dashboard/SickDayMode';
import { 
  Smile, 
  Target, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Snowflake
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: string;
  targetDate: string;
  completed: boolean;
  progress_percentage: number;
  specific?: string;
  measurable?: string;
  achievable?: string;
  relevant?: string;
  timeBound?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  ai_generated: boolean;
  tag?: string;
  description?: string;
}

interface DashboardContentFullProps {
  isSickDay?: boolean;
  onSickDayReturn?: () => void;
}

const DashboardContentFull = ({ isSickDay = false, onSickDayReturn }: DashboardContentFullProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<string>('');
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reflection, setReflection] = useState<string>('');
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    targetDate: ''
  });

  const { entries: pieChartEntries, updateEntry: updatePieChartEntry } = usePieChartData();
  const { tasks: aiTasks, loading: aiLoading, regenerateTasks } = useAiTasks(currentMood, energyLevel);

  // Show sick day mode if enabled
  if (isSickDay && onSickDayReturn) {
    return (
      <div className="relative">
        {/* Frost overlay animation */}
        <div className="fixed inset-0 bg-blue-100/30 backdrop-blur-sm z-10 frost-animation" />
        <SickDayMode onReturn={onSickDayReturn} />
      </div>
    );
  }

  // Load user data
  useEffect(() => {
    if (user) {
      loadGoals();
      loadTasks();
      loadTodaysReflection();
      loadTodaysMood();
    }
  }, [user]);

  const loadGoals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (err) {
      console.error('Error loading goals:', err);
    }
  };

  const loadTasks = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const loadTodaysReflection = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setReflection(data?.content || '');
    } catch (err) {
      console.error('Error loading reflection:', err);
    }
  };

  const loadTodaysMood = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setCurrentMood(data.mood);
        // Convert mood to energy level
        const moodToEnergy: Record<string, number> = {
          'terrible': 1,
          'bad': 2,
          'okay': 3,
          'good': 4,
          'great': 5
        };
        setEnergyLevel(moodToEnergy[data.mood.toLowerCase()] || 3);
      }
    } catch (err) {
      console.error('Error loading mood:', err);
    }
  };

  const handleMoodChange = async (mood: string) => {
    if (!user) return;
    
    setCurrentMood(mood);
    const moodToEnergy: Record<string, number> = {
      'terrible': 1,
      'bad': 2,
      'okay': 3,
      'good': 4,
      'great': 5
    };
    setEnergyLevel(moodToEnergy[mood.toLowerCase()] || 3);

    try {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('mood_entries')
        .upsert({
          user_id: user.id,
          date: today,
          mood
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      
      toast({
        title: "Mood updated",
        description: `Today's energy: ${(moodToEnergy[mood.toLowerCase()] || 3) * 20}%`
      });
    } catch (err) {
      console.error('Error saving mood:', err);
      toast({
        title: "Error",
        description: "Failed to save mood",
        variant: "destructive"
      });
    }
  };

  const handleAddGoal = async () => {
    if (!user || !newGoal.title.trim()) return;

    try {
      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          goal_text: newGoal.title,
          title: newGoal.title,
          description: newGoal.description,
          category: newGoal.category,
          priority: newGoal.priority === 'high' ? 3 : newGoal.priority === 'medium' ? 2 : 1,
          date: new Date().toISOString().split('T')[0],
          completed: false,
          progress_percentage: 0
        });

      if (error) throw error;

      setNewGoal({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        targetDate: ''
      });
      setShowGoalForm(false);
      loadGoals();
      
      toast({
        title: "Goal added!",
        description: "Your new goal has been created"
      });
    } catch (err) {
      console.error('Error adding goal:', err);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive"
      });
    }
  };

  const handleAddAiTask = async (aiTask: any) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: aiTask.title,
          description: aiTask.description,
          date: today,
          ai_generated: true,
          mood_context: currentMood,
          completed: false
        });

      if (error) throw error;
      
      loadTasks();
      toast({
        title: "Task added!",
        description: "AI suggestion added to your tasks"
      });
    } catch (err) {
      console.error('Error adding AI task:', err);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive"
      });
    }
  };

  const handleSaveReflection = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('reflections')
        .upsert({
          user_id: user.id,
          date: today,
          content: reflection
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      
      toast({
        title: "Reflection saved",
        description: "Your daily reflection has been saved"
      });
    } catch (err) {
      console.error('Error saving reflection:', err);
      toast({
        title: "Error",
        description: "Failed to save reflection",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mood Check-In */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Smile className="w-5 h-5" />
            <span>How are you feeling today?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MoodCheckIn currentMood={currentMood} onMoodChange={handleMoodChange} />
          {energyLevel > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Today's Energy:</p>
              <div className="flex items-center space-x-3">
                <Progress value={energyLevel * 20} className="flex-1" />
                <span className="text-lg font-bold text-purple-600">{energyLevel * 20}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goals Section */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Target className="w-5 h-5" />
              <span>SMART Goals</span>
            </CardTitle>
            <Button 
              onClick={() => setShowGoalForm(!showGoalForm)}
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showGoalForm && (
            <div className="bg-white/30 rounded-xl p-4 space-y-3">
              <Input
                placeholder="Goal title (Specific)"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="bg-white/50 border-white/30"
              />
              <Textarea
                placeholder="Description (Measurable & Achievable)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="bg-white/50 border-white/30"
              />
              <div className="grid grid-cols-2 gap-3">
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger className="bg-white/50 border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}>
                  <SelectTrigger className="bg-white/50 border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddGoal} className="bg-green-500 hover:bg-green-600 text-white">
                  Create Goal
                </Button>
                <Button onClick={() => setShowGoalForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{goal.title}</h3>
                  <Badge variant="outline" className="bg-white/20">
                    {goal.category}
                  </Badge>
                </div>
                {goal.description && (
                  <p className="text-sm text-gray-600">{goal.description}</p>
                )}
                <div className="flex items-center space-x-3">
                  <Progress value={goal.progress_percentage} className="flex-1" />
                  <span className="text-sm font-medium">{goal.progress_percentage}%</span>
                </div>
              </div>
            ))}
            
            {goals.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No goals yet. Create your first SMART goal!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Task Suggestions */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Sparkles className="w-5 h-5" />
              <span>AI Task Suggestions</span>
            </CardTitle>
            <Button 
              onClick={regenerateTasks}
              size="sm"
              variant="outline"
              disabled={aiLoading}
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {aiLoading ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Generating personalized suggestions...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {aiTasks.map((task) => (
                <div key={task.id} className="bg-white/30 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800">
                      {task.tag}
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => handleAddAiTask(task)}
                    size="sm"
                    className="ml-4 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pie Chart Planner */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Calendar className="w-5 h-5" />
            <span>24-Hour Day Planner</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart userId={user?.id || ''} />
        </CardContent>
      </Card>

      {/* Daily Reflection */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <BookOpen className="w-5 h-5" />
            <span>Daily Reflection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="How was your day? What did you learn? What are you grateful for?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="bg-white/50 border-white/30 min-h-[120px]"
          />
          <Button 
            onClick={handleSaveReflection}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Reflection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContentFull;