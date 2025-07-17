
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Brain, Target, Clock, Users, Sparkles } from "lucide-react";

interface PersonalizationQuestionnaireProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const PersonalizationQuestionnaire = ({ onNext, onBack }: PersonalizationQuestionnaireProps) => {
  const [responses, setResponses] = useState({
    primaryReason: '',
    currentChallenges: [],
    energyPatterns: '',
    workStyle: '',
    supportNeeds: '',
    personalNote: ''
  });

  const handleNext = () => {
    onNext(responses);
  };

  const questions = [
    {
      id: 'primaryReason',
      icon: Heart,
      title: 'What brings you to Nrvii today?',
      type: 'radio',
      options: [
        { value: 'burnout', label: 'Recovering from burnout or overwhelm' },
        { value: 'adhd', label: 'Managing ADHD or focus challenges' },
        { value: 'anxiety', label: 'Working with anxiety or stress' },
        { value: 'productivity', label: 'Building sustainable productivity habits' },
        { value: 'balance', label: 'Finding better work-life balance' },
        { value: 'goals', label: 'Achieving personal or professional goals' },
        { value: 'other', label: 'Something else (tell us below)' }
      ]
    },
    {
      id: 'energyPatterns',
      icon: Brain,
      title: 'When do you typically feel most energized?',
      type: 'radio',
      options: [
        { value: 'morning', label: 'Early morning (6-9 AM)' },
        { value: 'midmorning', label: 'Mid-morning (9 AM-12 PM)' },
        { value: 'afternoon', label: 'Afternoon (12-5 PM)' },
        { value: 'evening', label: 'Evening (5-9 PM)' },
        { value: 'varies', label: 'It varies day to day' },
        { value: 'unsure', label: 'I\'m not sure yet' }
      ]
    },
    {
      id: 'workStyle',
      icon: Target,
      title: 'How do you prefer to work on goals?',
      type: 'radio',
      options: [
        { value: 'small-chunks', label: 'Small, frequent sessions' },
        { value: 'focused-blocks', label: 'Longer, focused time blocks' },
        { value: 'spontaneous', label: 'When inspiration strikes' },
        { value: 'routine', label: 'Consistent daily routine' },
        { value: 'flexible', label: 'Flexible, adaptable approach' }
      ]
    },
    {
      id: 'supportNeeds',
      icon: Users,
      title: 'What kind of support resonates with you?',
      type: 'radio',
      options: [
        { value: 'gentle-reminders', label: 'Gentle reminders and check-ins' },
        { value: 'community', label: 'Community support and encouragement' },
        { value: 'insights', label: 'Data insights and pattern recognition' },
        { value: 'flexibility', label: 'Understanding when I need breaks' },
        { value: 'celebration', label: 'Celebrating small wins' },
        { value: 'minimal', label: 'Minimal notifications, I\'ll check in myself' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Let's Personalize Your Experience</h1>
          <p className="text-gray-600">
            Help us understand your unique needs so we can support you better.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 text-center">
              Tell Us About Yourself
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {questions.map((question) => {
              const IconComponent = question.icon;
              return (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-800">{question.title}</h3>
                  </div>
                  
                  <RadioGroup
                    value={responses[question.id as keyof typeof responses] as string}
                    onValueChange={(value) => 
                      setResponses(prev => ({ ...prev, [question.id]: value }))
                    }
                    className="space-y-3 ml-11"
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label 
                          htmlFor={option.value} 
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            })}

            {/* Personal Note */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800">
                  Anything else you'd like us to know? (Optional)
                </h3>
              </div>
              <Textarea
                placeholder="Share anything that might help us support you better - your goals, challenges, or what you hope to achieve..."
                value={responses.personalNote}
                onChange={(e) => 
                  setResponses(prev => ({ ...prev, personalNote: e.target.value }))
                }
                className="rounded-xl border-gray-200 focus:border-blue-400 ml-11"
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-blue-800">
                💙 <strong>Remember:</strong> You can always update these preferences in your settings. 
                There are no wrong answers - we're here to adapt to you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={onBack}
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                Great job! Continue →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalizationQuestionnaire;
