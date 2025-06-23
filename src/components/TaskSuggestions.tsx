
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { Goal } from './Dashboard';

interface TaskSuggestionsProps {
  mood: string | null;
  goals: Goal[];
  completedTasks: string[];
  onTaskComplete: (tasks: string[]) => void;
}

const taskSuggestions = {
  energized: [
    { id: 'energized-1', title: 'Outline your project plan', type: 'complex' },
    { id: 'energized-2', title: 'Deep work session (45 mins)', type: 'complex' },
    { id: 'energized-3', title: 'Brainstorm new ideas', type: 'medium' }
  ],
  focused: [
    { id: 'focused-1', title: 'Tackle your hardest task first', type: 'complex' },
    { id: 'focused-2', title: 'Review and refine your work', type: 'medium' },
    { id: 'focused-3', title: 'Plan tomorrow\'s priorities', type: 'medium' }
  ],
  tired: [
    { id: 'tired-1', title: 'Organize your workspace', type: 'simple' }
  ],
  stressed: [
    { id: 'stressed-1', title: 'Take a mindful 10-minute break', type: 'simple' }
  ],
  burnout: [
    { id: 'burnout-1', title: 'Sort through old files', type: 'simple' }
  ]
};

const TaskSuggestions = ({ mood, goals, completedTasks, onTaskComplete }: TaskSuggestionsProps) => {
  const activeGoals = goals.filter(goal => !goal.completed);
  const suggestedTasks = mood ? taskSuggestions[mood as keyof typeof taskSuggestions] || [] : [];

  const handleTaskToggle = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      onTaskComplete(completedTasks.filter(id => id !== taskId));
    } else {
      onTaskComplete([...completedTasks, taskId]);
    }
  };

  const getTaskGoal = (taskIndex: number) => {
    return activeGoals[taskIndex % activeGoals.length] || null;
  };

  if (!mood) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Ready for Today's Tasks?
          </CardTitle>
          <CardDescription className="text-gray-600">
            Check in with your mood first to get personalized suggestions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (activeGoals.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Set Your Goals First
          </CardTitle>
          <CardDescription className="text-gray-600">
            Tasks will appear once you have goals to work towards
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Today's Suggested Tasks
        </CardTitle>
        <CardDescription className="text-gray-600">
          Based on how you're feeling right now
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestedTasks.map((task, index) => {
          const relatedGoal = getTaskGoal(index);
          const isCompleted = completedTasks.includes(task.id);
          
          return (
            <div
              key={task.id}
              className={`p-4 border rounded-2xl transition-all duration-200 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'border-gray-200 hover:shadow-md hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTaskToggle(task.id)}
                  className={`mt-0.5 p-1 ${
                    isCompleted 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </Button>
                <div className="flex-1 space-y-1">
                  <p className={`font-medium ${
                    isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}>
                    {task.title}
                  </p>
                  {relatedGoal && (
                    <p className="text-xs text-gray-600">
                      Supports: {relatedGoal.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {suggestedTasks.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm">Taking it easy today? That's perfectly okay.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskSuggestions;
