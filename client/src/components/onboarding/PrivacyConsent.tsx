
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Eye, Users, FileText, Lock, Heart } from "lucide-react";

interface PrivacyConsentProps {
  onNext: (consents: any) => void;
  onBack: () => void;
}

const PrivacyConsent = ({ onNext, onBack }: PrivacyConsentProps) => {
  const [consents, setConsents] = useState({
    essential: true, // Required
    analytics: false,
    community: false,
    notifications: false,
    research: false
  });

  const handleConsentChange = (key: string, value: boolean) => {
    setConsents(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = consents.essential;

  const privacyItems = [
    {
      id: 'essential',
      icon: Shield,
      title: 'Essential Data',
      description: 'Account creation, authentication, and core app functionality. This is required for the app to work.',
      required: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'analytics',
      icon: Eye,
      title: 'Usage Analytics',
      description: 'Anonymous data about how you use the app to help us improve. No personal information is shared.',
      required: false,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'community',
      icon: Users,
      title: 'Community Features',
      description: 'Anonymous participation in support groups and community challenges. You control your visibility.',
      required: false,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'notifications',
      icon: Heart,
      title: 'Gentle Reminders',
      description: 'Caring check-ins and motivational messages. You can customize or disable these anytime.',
      required: false,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      id: 'research',
      icon: FileText,
      title: 'Mental Health Research',
      description: 'Anonymized data to help advance mental health research. Your identity is never shared.',
      required: false,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Your Privacy, Your Choice</h1>
          <p className="text-gray-600">
            We believe in radical transparency. Choose what you're comfortable sharing.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 text-center">
              Data Consent Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {privacyItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="flex items-start space-x-4 p-4 rounded-2xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 flex items-center gap-2">
                        {item.title}
                        {item.required && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Required
                          </span>
                        )}
                      </h3>
                      <Checkbox
                        checked={consents[item.id as keyof typeof consents]}
                        onCheckedChange={(checked) => 
                          handleConsentChange(item.id, checked as boolean)
                        }
                        disabled={item.required}
                        className="rounded"
                      />
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-blue-800">
                <strong>Your control:</strong> You can change these preferences anytime in Settings. 
                We'll never share your personal data without explicit permission.
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
                onClick={() => onNext(consents)}
                disabled={!canProceed}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                Continue with My Choices
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Read our full{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsent;
