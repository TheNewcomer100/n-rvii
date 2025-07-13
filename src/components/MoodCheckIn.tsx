
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, Sparkles, Star } from "lucide-react";

interface MoodCheckInProps {
  currentMood: string | null;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { 
    id: 'energized', 
    label: 'Energized', 
    emoji: '✨', 
    color: 'from-yellow-300 to-orange-300', 
    bgColor: 'from-yellow-50 to-orange-50',
    description: 'Feeling bright and ready to take on the world!'
  },
  { 
    id: 'focused', 
    label: 'Focused', 
    emoji: '🎯', 
    color: 'from-blue-300 to-purple-300', 
    bgColor: 'from-blue-50 to-purple-50',
    description: 'Mind is clear and ready for deep work'
  },
  { 
    id: 'tired', 
    label: 'Tired', 
    emoji: '😌', 
    color: 'from-gray-300 to-blue-300', 
    bgColor: 'from-gray-50 to-blue-50',
    description: 'Need some gentle, restoring activities'
  },
  { 
    id: 'stressed', 
    label: 'Stressed', 
    emoji: '🌊', 
    color: 'from-blue-300 to-green-300', 
    bgColor: 'from-blue-50 to-green-50',
    description: 'Let\'s find calm together, one breath at a time'
  },
  { 
    id: 'burnout', 
    label: 'Need Rest', 
    emoji: '🌙', 
    color: 'from-purple-300 to-gray-300', 
    bgColor: 'from-purple-50 to-gray-50',
    description: 'Your feelings are valid. Rest is productive too.'
  }
];

const moodMessages = {
  energized: "Beautiful energy! Let's channel this into something meaningful and fulfilling. ✨",
  focused: "Your mind is clear and ready. Perfect time for deep, intentional work. 🎯",
  tired: "Gentle day ahead? Let's keep it light, nurturing, and kind to yourself. 🌸",
  stressed: "Take a deep breath. We'll find calm together, one mindful step at a time. 🌊",
  burnout: "Your feelings are completely valid. Let's focus on gentle restoration and self-care today. 🌙"
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
    <Card className="bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-r from-pink-100/60 via-purple-100/60 to-blue-100/60 pb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-3xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            How's Your Energy Today?
          </CardTitle>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardDescription className="text-gray-600 text-lg">
          Your feelings guide our suggestions 🌈 Take your time, there's no rush.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-5 gap-4">
          {moods.map((mood) => (
            <div key={mood.id} className="flex flex-col items-center space-y-2">
              <button
                onClick={() => handleMoodSelect(mood.id)}
                className={`relative p-6 rounded-3xl text-center transition-all duration-300 hover:scale-110 hover:shadow-xl group ${
                  currentMood === mood.id 
                    ? 'ring-4 ring-purple-300 shadow-2xl transform scale-110' 
                    : 'hover:shadow-lg border-2 border-transparent hover:border-purple-200'
                }`}
                style={{
                  background: currentMood === mood.id 
                    ? `linear-gradient(135deg, var(--tw-gradient-stops)) ${mood.color.replace('from-', 'from-').replace('to-', 'to-')}` 
                    : `linear-gradient(135deg, var(--tw-gradient-stops)) ${mood.bgColor.replace('from-', 'from-').replace('to-', 'to-')}`
                }}
              >
                <div className="text-4xl mb-3 transition-transform duration-200 group-hover:scale-125">
                  {mood.emoji}
                </div>
                {currentMood === mood.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                )}
              </button>
              <div className={`text-sm font-semibold transition-all duration-200 text-center ${
                currentMood === mood.id ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {mood.label}
              </div>
              {currentMood === mood.id && (
                <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
                  {mood.description}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {currentMood && (
          <div className="text-center p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-3xl border-2 border-purple-100 shadow-inner">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-purple-500" />
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-blue-800 font-medium leading-relaxed text-lg">
              {moodMessages[currentMood as keyof typeof moodMessages]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;
