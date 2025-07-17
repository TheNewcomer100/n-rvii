
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Sparkles, 
  Target, 
  Battery, 
  Users, 
  Shield,
  Trophy,
  ArrowRight,
  Star
} from "lucide-react";

interface CompletionCelebrationProps {
  onComplete: () => void;
  guestMode?: boolean;
}

const CompletionCelebration = ({ onComplete, guestMode = false }: CompletionCelebrationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const celebrationMessages = [
    "🎉 Welcome to your sanctuary!",
    "💚 You've taken the first step toward sustainable success",
    "✨ Your mental health journey starts here",
    "🌟 Ready to honor your energy and achieve your goals?"
  ];

  const features = [
    {
      icon: Battery,
      title: 'Energy-First Approach',
      description: 'Tasks that match your current energy level',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Target,
      title: 'Compassionate Goal Setting',
      description: 'Progress without pressure or guilt',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Users,
      title: 'Anonymous Community',
      description: 'Support from others who understand',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your data stays yours, always',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const nextSteps = [
    'Log your current energy level',
    'Add your first goal or task',
    'Explore community support (optional)',
    'Set up gentle reminders'
  ];

  useEffect(() => {
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Star className="w-4 h-4 text-yellow-400 opacity-70" />
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-3xl space-y-8 relative z-10">
        {/* Celebration Header */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
              {celebrationMessages[currentMessage]}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You've completed your onboarding! {guestMode ? 
                'You can always create an account later to save your progress.' :
                'Your personalized mental health productivity journey begins now.'
              }
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              What Makes Nrvii Special
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
                    <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-600" />
                Your First Steps
              </h3>
              <div className="space-y-2">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {!guestMode && (
              <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      <strong>Achievement Unlocked:</strong> Onboarding Champion! 
                      You've earned your first badge for completing the setup process.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <Button 
                onClick={onComplete}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium flex items-center gap-3"
              >
                <span>Enter Your Sanctuary</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <p className="text-sm text-gray-500 italic">
                "Remember: This is your safe space. Go at your own pace. You belong here."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need support? We're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Help Center</a>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Community Guidelines</a>
            <a href="#" className="text-red-600 hover:text-red-700 font-medium">Crisis Support 24/7</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCelebration;
