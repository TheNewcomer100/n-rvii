// client/src/components/dashboard/DashboardContent.tsx
import React from 'react';
import PieChart from '@/components/PieChart';
import SickDayMode from '@/components/dashboard/SickDayMode';

interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface SubscriptionTier {
  tier: 'free' | 'premium';
  goalLimit: number;
  features: string[];
}

interface DashboardContentProps {
  currentMood: string | null;
  goals: Goal[];
  tasks: Task[];
  completedTasks: string[];
  streak: number;
  dailyReflection: string;
  canCreateGoal: boolean;
  currentTier: SubscriptionTier;
  isSickDay?: boolean;
  userId?: string;
  onMoodChange: (mood: string) => void;
  onGoalsChange: (goals: Goal[]) => void;
  onGoalComplete: (goalId: string) => void;
  onTaskComplete: (taskIds: string[]) => void;
  onTasksGenerated: (tasks: Task[]) => void;
  onTaskUpdate: (taskId: string, newTitle: string) => void;
  onReflectionChange: (reflection: string) => void;
  onSickDayReturn?: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  currentMood,
  goals,
  tasks,
  completedTasks,
  streak,
  dailyReflection,
  canCreateGoal,
  currentTier,
  isSickDay = false,
  userId,
  onMoodChange,
  onGoalsChange,
  onGoalComplete,
  onTaskComplete,
  onTasksGenerated,
  onTaskUpdate,
  onReflectionChange,
  onSickDayReturn,
}) => {
  if (isSickDay && onSickDayReturn) {
    return <SickDayMode onReturn={onSickDayReturn} />;
  }
  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard Content Coming Soon
        </h2>
        <p className="text-gray-600">
          This section will contain mood check-ins, goal management, and task suggestions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Current Mood</h3>
          <p className="text-blue-600">{currentMood || 'Not set'}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Streak</h3>
          <p className="text-green-600">{streak} days</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Goals</h3>
          <p className="text-purple-600">{goals.length} active goals</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Tasks</h3>
          <p className="text-orange-600">{completedTasks.length}/{tasks.length} completed</p>
        </div>
      </div>
      
      {/* Activity Pie Chart */}
      {userId && (
        <div className="mt-6">
          <PieChart userId={userId} isSickDay={isSickDay} />
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
