
import MoodCheckIn from "../MoodCheckIn";
import GoalManagement from "../GoalManagement";
import TaskSuggestions from "../TaskSuggestions";
import ProgressSection from "../ProgressSection";
import DailyReflection from "../DailyReflection";
import { Goal, Task } from "@/types/dashboard";
import { SubscriptionTier } from "@/hooks/useSubscription";

interface DashboardContentProps {
  currentMood: string | null;
  goals: Goal[];
  tasks: Task[];
  completedTasks: string[];
  streak: number;
  dailyReflection: string;
  canCreateGoal: boolean;
  currentTier: SubscriptionTier;
  onMoodChange: (mood: string) => void;
  onGoalsChange: (goals: Goal[]) => void;
  onGoalComplete: (goalId: string) => void;
  onTaskComplete: (taskIds: string[]) => void;
  onTasksGenerated: (tasks: Task[]) => void;
  onTaskUpdate: (taskId: string, newTitle: string) => void;
  onReflectionChange: (reflection: string) => void;
}

const DashboardContent = ({
  currentMood,
  goals,
  tasks,
  completedTasks,
  streak,
  dailyReflection,
  canCreateGoal,
  currentTier,
  onMoodChange,
  onGoalsChange,
  onGoalComplete,
  onTaskComplete,
  onTasksGenerated,
  onTaskUpdate,
  onReflectionChange
}: DashboardContentProps) => {
  const activeGoals = goals.filter(goal => !goal.completed);

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Mood Check-In - Always at top */}
      <MoodCheckIn 
        currentMood={currentMood} 
        onMoodChange={onMoodChange} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Goals */}
        <div className="lg:col-span-1 space-y-6">
          <GoalManagement 
            goals={goals} 
            onGoalsChange={onGoalsChange}
            onGoalComplete={onGoalComplete}
            canCreateGoal={canCreateGoal}
            currentTier={currentTier}
          />
        </div>

        {/* Right Column - Tasks and Progress */}
        <div className="lg:col-span-2 space-y-6">
          <TaskSuggestions 
            mood={currentMood}
            goals={goals}
            tasks={tasks}
            completedTasks={completedTasks}
            onTaskComplete={onTaskComplete}
            onTasksGenerated={onTasksGenerated}
            onTaskUpdate={onTaskUpdate}
          />
          
          <ProgressSection 
            goals={goals}
            completedTasks={completedTasks}
            streak={streak}
          />
        </div>
      </div>

      {/* Daily Reflection */}
      <DailyReflection 
        reflection={dailyReflection}
        onReflectionChange={onReflectionChange}
        canReflect={completedTasks.length > 0}
      />
    </main>
  );
};

export default DashboardContent;
