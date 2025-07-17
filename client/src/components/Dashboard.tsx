import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [streak, setStreak] = useState(3);
  const [currentMood, setCurrentMood] = useState<string | null>('energetic');
  const [userName, setUserName] = useState("Demo User");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600">
            Your mental health and productivity dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {streak} days
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Keep up the great work!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Current Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize">
                  {currentMood || 'Not set'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                How are you feeling today?
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Migration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ✅ Complete
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Successfully migrated to Replit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Status */}
        <Card>
          <CardHeader>
            <CardTitle>Migration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800">Database Migration</span>
              <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800">API Routes Setup</span>
              <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800">TaskPieChart Component</span>
              <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800">Supabase Dependencies Removed</span>
              <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-600">
              <p className="mb-2">🎉 Migration from Lovable to Replit completed successfully!</p>
              <p className="text-sm">
                Your mental health platform is now running on Replit with PostgreSQL database,
                comprehensive API routes, and the new TaskPieChart component for time tracking.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;