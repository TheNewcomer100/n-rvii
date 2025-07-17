
import { useState, useEffect } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import PieChartDemo from '@/components/PieChartDemo';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [guestMode, setGuestMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onGuestMode={handleGuestMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Nrvii
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Mental Health & Productivity Platform
            </p>
            <p className="text-sm text-gray-500">
              Successfully migrated to Replit with PostgreSQL database
            </p>
          </div>
          
          <PieChartDemo userId="demo-user-123" />
          
          <div className="mt-8">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
