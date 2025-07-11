
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Sparkles, Edit3 } from "lucide-react";
import { Goal, Task } from '@/types/dashboard';
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
      <Card className="bg-gradient-to-br from-green-50/80 to-blue-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-green-400" />
          </div>
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
      <Card className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Edit3 className="w-8 h-8 text-purple-400" />
          </div>
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
    <Card className="bg-gradient-to-br from-blue-50/80 to-green-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100/50 to-green-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Your Tasks
              </CardTitle>
              <CardDescription className="text-gray-600">
                AI-powered suggestions based on your mood and goals
              </CardDescription>
            </div>
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
      <CardContent className="p-6 space-y-3">
        {activeTasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const relatedGoal = goals.find(goal => goal.id === task.goal_id);
          
          return (
            <div
              key={task.id}
              className={`p-4 rounded-2xl transition-all duration-300 hover:shadow-md ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                  : 'bg-white/70 border-2 border-blue-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTaskToggle(task.id)}
                  className={`mt-0.5 p-1 rounded-xl transition-all duration-200 ${
                    isCompleted 
                      ? 'text-green-600 hover:text-green-700 bg-green-100' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </Button>
                <div className="flex-1 space-y-2">
                  <div className={`font-medium transition-all duration-200 ${
                    isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}>
                    <InlineTaskEditor
                      task={task}
                      onTaskUpdate={onTaskUpdate}
                    />
                  </div>
                  {relatedGoal && (
                    <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg inline-block">
                      📌 Supports: {relatedGoal.title}
                    </p>
                  )}
                  {task.ai_generated && (
                    <p className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-lg inline-block">
                      ✨ AI Generated
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {activeTasks.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-gray-600 mb-2">No tasks yet</p>
            <p className="text-sm text-gray-500 mb-4">Generate some AI-powered suggestions!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskSuggestions;
