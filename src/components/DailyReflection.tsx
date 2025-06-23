
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
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
      <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Daily Reflection</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Complete at least one task to unlock your daily reflection
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <span>Daily Reflection</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          How are you feeling about today? Share a thought or choose an emoji.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emoji Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Choose a feeling:</p>
          <div className="flex flex-wrap gap-2">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className={`w-12 h-12 text-2xl hover:scale-110 transition-all duration-200 rounded-xl hover:bg-gray-50 ${
                  selectedEmoji === emoji ? 'bg-blue-50 ring-2 ring-blue-300' : ''
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
            className="rounded-xl border-gray-200 focus:border-blue-400"
            maxLength={120}
          />
          <p className="text-xs text-gray-500 mt-1">
            {120 - (reflectionText.replace(selectedEmoji, '').trim().length)} characters remaining
          </p>
        </div>

        {/* Save Button */}
        {(selectedEmoji || reflectionText.trim()) && (
          <div className="flex justify-end">
            <Button
              onClick={handleSaveReflection}
              className="rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
            >
              Save Reflection
            </Button>
          </div>
        )}

        {/* Weekly Summary Preview */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
          <p className="text-sm font-medium text-gray-800 mb-2">This Week's Reflections</p>
          <div className="space-y-1">
            <div className="text-xs text-gray-600">Mon: ✨ Felt energized after morning walk</div>
            <div className="text-xs text-gray-600">Tue: 😌 Peaceful day, grateful for small wins</div>
            <div className="text-xs text-gray-600">Wed: 🌱 Growing stronger each day</div>
            <div className="text-xs text-gray-600">
              Today: {selectedEmoji} {reflectionText.replace(selectedEmoji, '').trim() || 'Not reflected yet'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyReflection;
