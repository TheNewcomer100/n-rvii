
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Heart, Flame, Menu } from "lucide-react";
import FeedbackModal from "../enhanced/FeedbackModal";

interface DashboardHeaderProps {
  userName: string;
  streak: number;
  goalCount: number;
  goalLimit: number;
  onSickDay: () => void;
  onShowSettings: () => void;
}

const DashboardHeader = ({ 
  userName, 
  streak, 
  goalCount, 
  goalLimit, 
  onSickDay, 
  onShowSettings 
}: DashboardHeaderProps) => {
  const goalLimitText = goalLimit === Infinity ? '∞' : goalLimit.toString();

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center p-2">
                <img 
                  src="/lovable-uploads/2eadcba7-72a9-45a1-ac44-c612b69aabbd.png" 
                  alt="Nrvii Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Hello, {userName}! 👋
                </h1>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-xl">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{streak} day streak</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:shadow-md transition-all">
                    {goalCount}/{goalLimitText} goals
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FeedbackModal />
            <Button
              variant="ghost"
              size="sm"
              onClick={onSickDay}
              className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-2xl transition-colors"
            >
              <Heart className="w-4 h-4 mr-2" />
              Sick Day
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowSettings}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
