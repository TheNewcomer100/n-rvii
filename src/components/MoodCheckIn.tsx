
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MoodCheckInProps {
  currentMood: string | null;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { id: 'energized', label: 'Energized', emoji: '✨', color: 'from-yellow-400 to-orange-400' },
  { id: 'focused', label: 'Focused', emoji: '💡', color: 'from-blue-400 to-purple-400' },
  { id: 'tired', label: 'Tired', emoji: '😌', color: 'from-gray-400 to-blue-400' },
  { id: 'stressed', label: 'Stressed', emoji: '💙', color: 'from-blue-400 to-green-400' },
  { id: 'burnout', label: 'Burned Out', emoji: '💤', color: 'from-purple-400 to-gray-400' }
];

const moodMessages = {
  energized: "Beautiful energy! Let's channel this into something meaningful.",
  focused: "Your mind is clear and ready. Perfect time for deep work.",
  tired: "Gentle day ahead? Let's keep it light and nurturing.",
  stressed: "Take a breath. We'll find calm together, one step at a time.",
  burnout: "Your feelings are valid. Let's focus on gentle restoration today."
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
    <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-gray-800">
          How's Your Energy Today?
        </CardTitle>
        <CardDescription className="text-gray-600">
          Your feelings guide our suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`relative p-4 rounded-2xl text-center transition-all duration-200 hover:scale-105 ${
                currentMood === mood.id 
                  ? 'ring-2 ring-blue-400 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              style={{
                background: currentMood === mood.id 
                  ? `linear-gradient(135deg, ${mood.color.split(' ')[1]}, ${mood.color.split(' ')[3]})` 
                  : '#f8fafc'
              }}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className={`text-xs font-medium ${
                currentMood === mood.id ? 'text-white' : 'text-gray-700'
              }`}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>
        
        {currentMood && (
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <p className="text-sm text-blue-800 font-medium">
              {moodMessages[currentMood as keyof typeof moodMessages]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;
