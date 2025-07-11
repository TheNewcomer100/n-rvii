
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DailyReflectionProps {
  reflection: string;
  onReflectionChange: (reflection: string) => void;
  canReflect: boolean;
}

const moodEmojis = ['😊', '😌', '😐', '😔', '😴', '✨', '💙', '🌱', '🌟', '🦋'];

const DailyReflection = ({ reflection, onReflectionChange, canReflect }: DailyReflectionProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [reflectionText, setReflectionText] = useState(reflection);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    const newReflection = `${emoji} ${reflectionText}`.trim();
    setReflectionText(newReflection);
    onReflectionChange(newReflection);
  };

  const handleTextChange = (text: string) => {
    setReflectionText(text);
    const finalReflection = selectedEmoji ? `${selectedEmoji} ${text}` : text;
    onReflectionChange(finalReflection);
  };

  const handleSaveReflection = () => {
    if (reflectionText.trim()) {
      toast({
        title: "Reflection Saved ✨",
        description: "Your thoughts have been captured for today.",
      });
    }
  };

  if (!canReflect) {
    return (
      <Card className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center space-x-2">
            <span>Daily Reflection</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Complete at least one task to unlock your daily reflection 🌟
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100/50 to-pink-100/50">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span>Daily Reflection</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          How are you feeling about today? Share a thought or choose an emoji. 🌸
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Emoji Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-3 font-medium">Choose a feeling:</p>
          <div className="flex flex-wrap gap-2">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className={`w-12 h-12 text-2xl hover:scale-110 transition-all duration-200 rounded-2xl hover:shadow-md ${
                  selectedEmoji === emoji 
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 ring-2 ring-purple-300 shadow-lg' 
                    : 'hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <Input
            placeholder="One line about your day... (optional)"
            value={reflectionText.replace(selectedEmoji, '').trim()}
            onChange={(e) => handleTextChange(e.target.value)}
            className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 p-4"
            maxLength={120}
          />
          <p className="text-xs text-gray-500 mt-2 text-right">
            {120 - (reflectionText.replace(selectedEmoji, '').trim().length)} characters remaining
          </p>
        </div>

        {/* Save Button */}
        {(selectedEmoji || reflectionText.trim()) && (
          <div className="flex justify-end">
            <Button
              onClick={handleSaveReflection}
              className="rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Save Reflection
            </Button>
          </div>
        )}

        {/* Weekly Summary Preview */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border-2 border-blue-100">
          <p className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
            This Week's Reflections
          </p>
          <div className="space-y-2">
            <div className="text-xs text-gray-600 p-2 bg-white/60 rounded-lg">Mon: ✨ Felt energized after morning walk</div>
            <div className="text-xs text-gray-600 p-2 bg-white/60 rounded-lg">Tue: 😌 Peaceful day, grateful for small wins</div>
            <div className="text-xs text-gray-600 p-2 bg-white/60 rounded-lg">Wed: 🌱 Growing stronger each day</div>
            <div className="text-xs text-gray-700 p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg font-medium">
              Today: {selectedEmoji} {reflectionText.replace(selectedEmoji, '').trim() || 'Not reflected yet'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyReflection;
