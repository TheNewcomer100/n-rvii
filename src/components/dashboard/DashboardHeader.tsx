
import { Button } from "@/components/ui/button";
import { Settings, Flame } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  streak: number;
  onSickDay: () => void;
  onShowSettings: () => void;
}

const DashboardHeader = ({ userName, streak, onSickDay, onShowSettings }: DashboardHeaderProps) => {
  const welcomeMessages = [
    "Welcome back, {name}. Let's nurture your focus today.",
    "Hello, {name}. Ready to tend to your dreams?",
    "Good to see you, {name}. Your journey continues here.",
    "Welcome, {name}. Let's create something beautiful today."
  ];

  const getWelcomeMessage = () => {
    const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    return message.replace('{name}', userName);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/b7e84c59-cc69-4b80-9e2c-7969dd1c0c4f.png" 
              alt="Nrvii Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Nrvii</h1>
              <p className="text-sm text-gray-600">{getWelcomeMessage()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">{streak} days</span>
            </div>
            <Button
              onClick={onSickDay}
              variant="outline"
              size="sm"
              className="rounded-xl text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              Sick Day
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-xl"
              onClick={onShowSettings}
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
