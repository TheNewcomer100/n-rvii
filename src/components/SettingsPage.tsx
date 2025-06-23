
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Download, User, Bell, Shield, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
  userName: string;
}

const SettingsPage = ({ onBack, userName }: SettingsPageProps) => {
  const [profile, setProfile] = useState({
    name: userName,
    email: 'user@example.com'
  });
  
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyProgress: true,
    goalDeadlines: true,
    moodCheckIns: false
  });

  const [privacy, setPrivacy] = useState({
    dataCollection: false,
    analytics: false,
    personalizedTips: true
  });

  const handleExportData = (format: 'csv' | 'json') => {
    // In real implementation, this would generate and download actual data
    const mockData = {
      moods: [
        { date: '2024-01-15', mood: 'energized', tasks_completed: 3 },
        { date: '2024-01-16', mood: 'focused', tasks_completed: 2 }
      ],
      goals: [
        { title: 'Launch creative project', category: 'Creative', completed: false }
      ],
      tasks: [
        { date: '2024-01-15', task: 'Outline project plan', completed: true }
      ]
    };

    const dataStr = format === 'json' 
      ? JSON.stringify(mockData, null, 2)
      : 'Date,Mood,Tasks Completed\n2024-01-15,energized,3\n2024-01-16,focused,2';

    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nrvii-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported ✨",
      description: `Your data has been downloaded as ${format.toUpperCase()}.`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved ✨",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
              <p className="text-sm text-gray-600">Customize your Nrvii experience</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Profile</span>
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-green-500" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Choose what notifications you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-reminders">Daily Check-in Reminders</Label>
                  <p className="text-sm text-gray-600">Gentle nudges to check in with your mood</p>
                </div>
                <Switch
                  id="daily-reminders"
                  checked={notifications.dailyReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, dailyReminders: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-progress">Weekly Progress Updates</Label>
                  <p className="text-sm text-gray-600">Summary of your achievements</p>
                </div>
                <Switch
                  id="weekly-progress"
                  checked={notifications.weeklyProgress}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyProgress: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="goal-deadlines">Goal Deadline Reminders</Label>
                  <p className="text-sm text-gray-600">Supportive reminders about upcoming deadlines</p>
                </div>
                <Switch
                  id="goal-deadlines"
                  checked={notifications.goalDeadlines}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, goalDeadlines: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>Privacy</span>
            </CardTitle>
            <CardDescription>
              Control how your data is used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection">Anonymous Usage Data</Label>
                  <p className="text-sm text-gray-600">Help improve Nrvii with anonymous usage patterns</p>
                </div>
                <Switch
                  id="data-collection"
                  checked={privacy.dataCollection}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, dataCollection: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="personalized-tips">Personalized Tips</Label>
                  <p className="text-sm text-gray-600">Receive tips based on your mood patterns</p>
                </div>
                <Switch
                  id="personalized-tips"
                  checked={privacy.personalizedTips}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, personalizedTips: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <span>Data Export</span>
            </CardTitle>
            <CardDescription>
              Download your mood and task history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Button
                onClick={() => handleExportData('csv')}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as CSV
              </Button>
              <Button
                onClick={() => handleExportData('json')}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as JSON
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Your exported data includes mood check-ins, completed tasks, and goal progress.
            </p>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
