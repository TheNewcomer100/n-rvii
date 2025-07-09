
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface SickDayModeProps {
  onReturn: () => void;
}

const SickDayMode = ({ onReturn }: SickDayModeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto space-y-8 pt-12">
        <Card className="text-center p-8 bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Rest & Restore</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Take all the time you need. Your goals will be here when you're ready, 
              and your streak stays protected.
            </p>
            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-blue-800">
                💙 Gentle self-care suggestions: Take a warm bath, listen to calming music, 
                or simply rest without guilt.
              </p>
            </div>
            <div className="pt-4">
              <Button 
                onClick={onReturn}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                I'm Ready to Return
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SickDayMode;
