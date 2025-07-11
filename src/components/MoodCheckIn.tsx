
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, Sparkles } from "lucide-react";

interface MoodCheckInProps {
  currentMood: string | null;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { id: 'energized', label: 'Energized', emoji: '✨', color: 'from-yellow-200 to-orange-200', bgColor: 'from-yellow-50 to-orange-50' },
  { id: 'focused', label: 'Focused', emoji: '🎯', color: 'from-blue-200 to-purple-200', bgColor: 'from-blue-50 to-purple-50' },
  { id: 'tired', label: 'Tired', emoji: '😌', color: 'from-gray-200 to-blue-200', bgColor: 'from-gray-50 to-blue-50' },
  { id: 'stressed', label: 'Stressed', emoji: '🌊', color: 'from-blue-200 to-green-200', bgColor: 'from-blue-50 to-green-50' },
  { id: 'burnout', label: 'Need Rest', emoji: '🌙', color: 'from-purple-200 to-gray-200', bgColor: 'from-purple-50 to-gray-50' }
];

const moodMessages = {
  energized: "Beautiful energy! Let's channel this into something meaningful. ✨",
  focused: "Your mind is clear and ready. Perfect time for deep work. 🎯",
  tired: "Gentle day ahead? Let's keep it light and nurturing. 🌸",
  stressed: "Take a breath. We'll find calm together, one step at a time. 🌊",
  burnout: "Your feelings are valid. Let's focus on gentle restoration today. 🌙"
};

const MoodCheckIn = ({ currentMood, onMoodChange }: MoodCheckInProps) => {
  const handleMoodSelect = (moodId: string) => {
    onMoodChange(moodId);
    toast({
      title: "Mood checked in ✨",
      description: moodMessages[moodId as keyof typeof moodMessages],
    });
  };

  return (
    <Card className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-r from-pink-100/50 to-purple-100/50">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            How's Your Energy Today?
          </CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Your feelings guide our suggestions 🌈
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`relative p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                currentMood === mood.id 
                  ? 'ring-3 ring-purple-300 shadow-lg transform scale-105' 
                  : 'hover:shadow-md border-2 border-transparent hover:border-purple-200'
              }`}
              style={{
                background: currentMood === mood.id 
                  ? `linear-gradient(135deg, var(--tw-gradient-stops)) ${mood.color.replace('from-', 'from-').replace('to-', 'to-')}` 
                  : `linear-gradient(135deg, var(--tw-gradient-stops)) ${mood.bgColor.replace('from-', 'from-').replace('to-', 'to-')}`
              }}
            >
              <div className="text-3xl mb-2 transition-transform duration-200 hover:scale-110">
                {mood.emoji}
              </div>
              <div className={`text-xs font-medium transition-colors duration-200 ${
                currentMood === mood.id ? 'text-gray-700' : 'text-gray-600'
              }`}>
                {mood.label}
              </div>
              {currentMood === mood.id && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        {currentMood && (
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border-2 border-blue-100">
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              {moodMessages[currentMood as keyof typeof moodMessages]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;
