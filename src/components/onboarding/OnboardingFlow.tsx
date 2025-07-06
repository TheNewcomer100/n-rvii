
import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import WelcomeScreen from './WelcomeScreen';
import PrivacyConsent from './PrivacyConsent';
import AuthOptions from './AuthOptions';
import PersonalizationQuestionnaire from './PersonalizationQuestionnaire';
import GoalSetting from './GoalSetting';
import InteractiveDemo from './InteractiveDemo';
import CompletionCelebration from './CompletionCelebration';

interface OnboardingFlowProps {
  onComplete: () => void;
  onGuestMode: () => void;
}

const OnboardingFlow = ({ onComplete, onGuestMode }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [guestMode, setGuestMode] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    privacyConsents: {},
    personalization: {},
    goals: [],
    preferences: {}
  });

  const steps = [
    'Welcome',
    'Privacy',
    'Sign Up',
    'About You',
    'Goals',
    'Demo',
    'Complete'
  ];

  const handleNext = (data?: any) => {
    if (data) {
      setOnboardingData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    onGuestMode();
  };

  const progress = ((currentStep) / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen 
            onNext={() => handleNext()} 
            onSkipToGuest={handleGuestMode}
          />
        );
      case 1:
        return (
          <PrivacyConsent 
            onNext={(consents) => handleNext({ privacyConsents: consents })}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <AuthOptions 
            onNext={() => handleNext()}
            onBack={handleBack}
            onGuest={handleGuestMode}
          />
        );
      case 3:
        return (
          <PersonalizationQuestionnaire 
            onNext={(data) => handleNext({ personalization: data })}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <GoalSetting 
            onNext={(goals) => handleNext({ goals })}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <InteractiveDemo 
            onNext={() => handleNext()}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <CompletionCelebration 
            onComplete={onComplete}
            guestMode={guestMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {steps.length - 1}
              </span>
              <span className="text-sm text-gray-500">
                {steps[currentStep]}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}
      
      {/* Step Content */}
      <div className={currentStep > 0 && currentStep < steps.length - 1 ? 'pt-20' : ''}>
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
