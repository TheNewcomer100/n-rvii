
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import LoginPopup from '@/components/LoginPopup';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardContentFull from '@/components/enhanced/DashboardContentFull';

const Index = () => {
  const { user, session, loading, isPaid, isGuest } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleGuestMode = () => {
    window.location.href = '/guest-dashboard';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Nrvii...</p>
        </div>
      </div>
    );
  }

  // Show onboarding for new users
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onGuestMode={handleGuestMode}
      />
    );
  }

  // Show login popup for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nrvii
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your mental health & productivity companion
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="w-full text-purple-600 hover:text-purple-700 font-medium py-2"
            >
              Take Interactive Demo
            </button>
          </div>
        </div>
        
        <LoginPopup 
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onGuestMode={handleGuestMode}
        />
      </div>
    );
  }

  // Show dashboard for authenticated users
  if (isGuest) {
    window.location.href = '/guest-dashboard';
    return null;
  }
  
  if (isPaid) {
    window.location.href = '/paid-dashboard';
    return null;
  }

  // Default authenticated dashboard
  return (
    <DashboardLayout>
      <DashboardContentFull />
    </DashboardLayout>
  );
};

export default Index;
