import { useState, useEffect, useCallback } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

interface TaskLogEntry {
  id: string;
  userId: string;
  activity: string;
  duration: number; // in minutes
  date: string;
  hour: number;
  createdAt: string;
}

interface PieChartProps {
  userId: string;
  isSickDay?: boolean;
  className?: string;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1',
  '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98'
];

const ACTIVITY_COLORS: Record<string, string> = {
  'work': '#8884d8',
  'exercise': '#82ca9d',
  'rest': '#ffc658',
  'social': '#ff7c7c',
  'learning': '#8dd1e1',
  'creativity': '#d084d0',
  'entertainment': '#ffb347',
  'chores': '#87ceeb',
  'self-care': '#dda0dd',
  'other': '#98fb98'
};

const TaskPieChart: React.FC<PieChartProps> = ({ userId, isSickDay = false, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];

  // Fetch task log data for today
  const { data: taskLogs = [], isLoading, error } = useQuery({
    queryKey: ['/api/task-logs', userId, today],
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  // Process data for pie chart
  const chartData: ChartData[] = taskLogs.reduce((acc: ChartData[], log: TaskLogEntry) => {
    const existingActivity = acc.find(item => item.name === log.activity);
    if (existingActivity) {
      existingActivity.value += log.duration;
    } else {
      acc.push({
        name: log.activity,
        value: log.duration,
        color: ACTIVITY_COLORS[log.activity] || COLORS[acc.length % COLORS.length]
      });
    }
    return acc;
  }, []);

  // Handle sick day animation
  useEffect(() => {
    if (isSickDay) {
      setIsAnimating(true);
      // Stop animation after 3 seconds
      const timer = setTimeout(() => setIsAnimating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSickDay]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const hours = Math.floor(data.value / 60);
      const minutes = data.value % 60;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-gray-600">
            {hours > 0 && `${hours}h `}
            {minutes}m
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total time
  const totalMinutes = chartData.reduce((sum, item) => sum + item.value, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (error) {
    return (
      <div className={cn("p-6 bg-red-50 border border-red-200 rounded-lg", className)}>
        <p className="text-red-600">Error loading activity data</p>
      </div>
    );
  }

  return (
    <div className={cn("relative bg-white rounded-xl shadow-lg border border-gray-100 p-6", className)}>
      {/* Sick Day Overlay */}
      {isSickDay && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-80 rounded-xl flex items-center justify-center z-10">
          <div className={cn(
            "text-center",
            isAnimating && "animate-pulse"
          )}>
            <div className={cn(
              "text-6xl mb-2 transition-all duration-1000",
              isAnimating ? "animate-bounce" : ""
            )}>
              ❄️
            </div>
            <p className="text-blue-800 font-medium text-lg">Sick Day</p>
            <p className="text-blue-600 text-sm">Chart Frozen - Take Care! 💙</p>
          </div>
          
          {/* Ice crystal animation */}
          {isAnimating && (
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-blue-200 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    fontSize: `${12 + Math.random() * 8}px`
                  }}
                >
                  ❄
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Daily Activity Distribution
        </h3>
        <p className="text-gray-600 text-sm">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        {totalMinutes > 0 && (
          <p className="text-gray-500 text-sm mt-1">
            Total tracked: {totalHours > 0 && `${totalHours}h `}{remainingMinutes}m
          </p>
        )}
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-lg font-medium">No activities tracked yet</p>
          <p className="text-sm">Start logging your tasks to see the distribution</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }} className="text-sm">
                    {value}
                  </span>
                )}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick Stats */}
      {chartData.length > 0 && !isSickDay && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Most Active</p>
            <p className="font-medium text-gray-900">
              {chartData.reduce((prev, current) => 
                prev.value > current.value ? prev : current
              ).name}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Activities</p>
            <p className="font-medium text-gray-900">
              {chartData.length} tracked
            </p>
          </div>
        </div>
      )}

      {/* Daily Reset Indicator */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        Chart resets daily at midnight
      </div>
    </div>
  );
};

export default TaskPieChart;