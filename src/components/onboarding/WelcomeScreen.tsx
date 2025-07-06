
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkipToGuest: () => void;
}

const WelcomeScreen = ({ onNext, onSkipToGuest }: WelcomeScreenProps) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/b7e84c59-cc69-4b80-9e2c-7969dd1c0c4f.png" 
              alt="Nrvii Logo" 
              className="h-16 w-auto"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              Welcome to Your Mental Health & Productivity Sanctuary
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Turn your many passions into sustainable success while honoring your mental health journey. 
              You belong here. Your energy matters.
            </p>
          </div>
        </div>

        {/* Mission Statement Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Our Promise to You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">Privacy First</h3>
                <p className="text-sm text-gray-600">Your data stays yours. Anonymous options available.</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800">Compassionate Community</h3>
                <p className="text-sm text-gray-600">Safe space for support and encouragement.</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-800">Sustainable Growth</h3>
                <p className="text-sm text-gray-600">Progress without pressure. Rest is productive.</p>
              </div>
            </div>

            {/* Founder Message */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
              {!showVideo ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-700 italic">
                    "As someone who has navigated ADHD, anxiety, and the pressure to 'do it all,' 
                    I created Nrvii to be the app I wish I had during my darkest moments."
                  </p>
                  <Button
                    onClick={() => setShowVideo(true)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Watch Message from Our Founder
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-gray-100 rounded-xl p-8 text-gray-500">
                    [Founder Video Placeholder - Warm, personal message about mental health journey]
                  </div>
                  <Button
                    onClick={() => setShowVideo(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600"
                  >
                    Close Video
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={onNext}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3"
              >
                Begin Your Journey
              </Button>
              <Button 
                onClick={onSkipToGuest}
                variant="outline"
                className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Explore as Guest
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Support */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need immediate support? 
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Crisis Resources Available 24/7
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
