
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { Goal, Task } from './Dashboard';
import AITaskGenerator from './enhanced/AITaskGenerator';
import InlineTaskEditor from './enhanced/InlineTaskEditor';

interface TaskSuggestionsProps {
  mood: string | null;
  goals: Goal[];
  tasks: Task[];
  completedTasks: string[];
  onTaskComplete: (tasks: string[]) => void;
  onTasksGenerated: (tasks: Task[]) => void;
  onTaskUpdate: (taskId: string, newTitle: string) => void;
}

const TaskSuggestions = ({ 
  mood, 
  goals, 
  tasks, 
  completedTasks, 
  onTaskComplete, 
  onTasksGenerated,
  onTaskUpdate 
}: TaskSuggestionsProps) => {
  const activeGoals = goals.filter(goal => !goal.completed);
  const activeTasks = tasks.filter(task => !task.completed);

  const handleTaskToggle = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      onTaskComplete(completedTasks.filter(id => id !== taskId));
    } else {
      onTaskComplete([...completedTasks, taskId]);
    }
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Your Tasks
            </CardTitle>
            <CardDescription className="text-gray-600">
              AI-powered suggestions based on your mood and goals
            </CardDescription>
          </div>
          {activeGoals.length > 0 && (
            <AITaskGenerator
              goalId={activeGoals[0].id}
              mood={mood}
              goalCategory={activeGoals[0].category}
              goalTitle={activeGoals[0].title}
              onTasksGenerated={onTasksGenerated}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeTasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const relatedGoal = goals.find(goal => goal.id === task.goal_id);
          
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
                  <div className={`font-medium ${
                    isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}>
                    <InlineTaskEditor
                      task={task}
                      onTaskUpdate={onTaskUpdate}
                    />
                  </div>
                  {relatedGoal && (
                    <p className="text-xs text-gray-600">
                      Supports: {relatedGoal.title}
                    </p>
                  )}
                  {task.ai_generated && (
                    <p className="text-xs text-blue-600 font-medium">
                      ✨ AI Generated
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {activeTasks.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm mb-4">No tasks yet. Generate some AI-powered suggestions!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskSuggestions;
