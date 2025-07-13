
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Sparkles, Star, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkipToGuest: () => void;
}

const WelcomeScreen = ({ onNext, onSkipToGuest }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/2eadcba7-72a9-45a1-ac44-c612b69aabbd.png" 
                alt="Nrvii Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Welcome to Your Mental Health & Productivity Sanctuary
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
              Turn your many passions into sustainable success while honoring your mental health journey. 
              You belong here. Your energy matters.
            </p>
          </div>
        </div>

        {/* Mission Statement Card */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-purple-100/60 via-blue-100/60 to-green-100/60">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-red-400" />
              Our Promise to You
              <Sparkles className="w-6 h-6 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border-2 border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Privacy First</h3>
                <p className="text-gray-600 leading-relaxed">Your data stays yours. Anonymous options available for complete peace of mind.</p>
              </div>
              <div className="text-center space-y-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl border-2 border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Sustainable Growth</h3>
                <p className="text-gray-600 leading-relaxed">Progress without pressure. Rest is productive. Honor your energy cycles.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={onNext}
                className="flex-1 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white py-6 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Begin Your Journey
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={onSkipToGuest}
                variant="outline"
                className="flex-1 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-6 text-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                Explore as Guest
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Support */}
        <div className="text-center p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl border-2 border-red-100">
          <p className="text-gray-700 font-medium">
            Need immediate support? 
            <a href="#" className="text-red-600 hover:text-red-700 font-bold ml-2 underline transition-colors">
              Crisis Resources Available 24/7
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
