
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('onboarding_progress')
            .select('current_step, completed_steps')
            .eq('user_id', user.id)
            .single();

          if (error || !data || data.completed_steps.length === 0) {
            setShowOnboarding(true);
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          setShowOnboarding(true);
        }
      }
      setCheckingOnboarding(false);
    };

    if (!loading) {
      if (!user && !guestMode) {
        setShowOnboarding(true);
        setCheckingOnboarding(false);
      } else if (user) {
        checkOnboardingStatus();
      } else {
        setCheckingOnboarding(false);
      }
    }
  }, [user, loading, guestMode]);

  const handleOnboardingComplete = async () => {
    if (user) {
      try {
        await supabase
          .from('onboarding_progress')
          .update({
            current_step: 7,
            completed_steps: ['welcome', 'privacy', 'auth', 'personalization', 'goals', 'demo', 'complete']
          })
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error updating onboarding progress:', error);
      }
    }
    setShowOnboarding(false);
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    setShowOnboarding(false);
  };

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your sanctuary...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onGuestMode={handleGuestMode}
      />
    );
  }

  return <Dashboard />;
};

export default Index;
