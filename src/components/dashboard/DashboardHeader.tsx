
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Heart, Flame } from "lucide-react";
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
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8c5d43a0-4c58-4d1f-a419-36dd96f5f908.png" 
                alt="Nrvii Logo" 
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Hello, {userName}! 👋
                </h1>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{streak} day streak</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
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
              className="text-gray-600 hover:text-gray-800"
            >
              <Heart className="w-4 h-4 mr-2" />
              Sick Day
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowSettings}
              className="text-gray-600 hover:text-gray-800"
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
