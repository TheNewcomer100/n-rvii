import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaskPieChart from './PieChart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PieChartDemoProps {
  userId?: string;
}

const PieChartDemo: React.FC<PieChartDemoProps> = ({ userId = 'demo-user' }) => {
  const [isSickDay, setIsSickDay] = useState(false);
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];

  // Mock mutation for adding task logs
  const addTaskLogMutation = useMutation({
    mutationFn: async (logData: { activity: string; duration: number; hour: number }) => {
      const response = await fetch('/api/task-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify({
          ...logData,
          date: today,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task log');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch task logs
      queryClient.invalidateQueries({ queryKey: ['/api/task-logs', userId, today] });
    },
  });

  const handleAddSampleData = () => {
    const sampleActivities = [
      { activity: 'work', duration: 180, hour: 9 },
      { activity: 'exercise', duration: 45, hour: 7 },
      { activity: 'rest', duration: 120, hour: 12 },
      { activity: 'social', duration: 90, hour: 18 },
      { activity: 'learning', duration: 60, hour: 20 },
    ];

    sampleActivities.forEach((activity, index) => {
      setTimeout(() => {
        addTaskLogMutation.mutate(activity);
      }, index * 500); // Stagger the additions for visual effect
    });
  };

  const handleSickDay = () => {
    setIsSickDay(!isSickDay);
  };

  return (
    <div className="space-y-6">
      {/* Demo Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            PieChart Component Demo
            <div className="flex items-center space-x-2">
              <Badge variant={isSickDay ? "destructive" : "secondary"}>
                {isSickDay ? "Sick Day" : "Active"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddSampleData}
              disabled={addTaskLogMutation.isPending || isSickDay}
              variant="outline"
            >
              {addTaskLogMutation.isPending ? "Adding..." : "Add Sample Data"}
            </Button>
            
            <Button 
              onClick={handleSickDay}
              variant={isSickDay ? "default" : "destructive"}
            >
              {isSickDay ? "End Sick Day" : "Sick Day Mode"} ❄️
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Features demonstrated:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Real-time data updates every 30 seconds</li>
              <li>Daily reset functionality (chart resets at midnight)</li>
              <li>Sick day mode with frost animation</li>
              <li>Interactive tooltips showing time breakdown</li>
              <li>Color-coded activities with customizable palette</li>
              <li>Responsive design with Tailwind CSS</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* TaskPieChart Component */}
      <TaskPieChart 
        userId={userId}
        isSickDay={isSickDay}
        className="w-full max-w-2xl mx-auto"
      />

      {/* API Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle>API Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Endpoints used:</strong></p>
            <div className="bg-gray-100 p-3 rounded font-mono text-xs">
              <div>GET /api/task-logs?date=today</div>
              <div>POST /api/task-logs</div>
              <div>DELETE /api/task-logs/:id</div>
            </div>
            <p className="mt-4">
              <strong>Database:</strong> PostgreSQL with Drizzle ORM
            </p>
            <p>
              <strong>Real-time updates:</strong> TanStack Query with 30-second refetch interval
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PieChartDemo;