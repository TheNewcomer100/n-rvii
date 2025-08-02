import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardContentFull from '@/components/enhanced/DashboardContentFull';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap } from "lucide-react";

const PaidDashboard = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if this is first visit after payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === 'true') {
      setShowWelcome(true);
      // Remove the param from URL
      window.history.replaceState({}, '', '/paid-dashboard');
    }
  }, []);

  return (
    <DashboardLayout>
      {/* Premium Status Banner */}
      <Card className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-purple-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-purple-800">Premium Access</h3>
              <p className="text-purple-600 text-sm">
                Unlimited goals, AI suggestions, advanced features enabled
              </p>
            </div>
            <Badge className="bg-purple-600 text-white">
              <Zap className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>
        </CardContent>
      </Card>

      <DashboardContentFull />

      {/* Welcome Modal for new paid users */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardContent className="p-6 text-center">
              <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Nrvii Pro!
              </h2>
              <p className="text-gray-600 mb-4">
                Thanks for upgrading! You now have access to:
              </p>
              <div className="space-y-2 text-left mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited SMART goals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm">AI-powered task suggestions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm">24-hour activity planner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Sick day streak freeze</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Progress analytics</span>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Let's Get Started!
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PaidDashboard;