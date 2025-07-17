
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface SubscriptionTier {
  tier: 'free' | 'premium';
  goalLimit: number;
  features: string[];
}

const SUBSCRIPTION_TIERS: Record<'free' | 'premium', SubscriptionTier> = {
  free: {
    tier: 'free',
    goalLimit: 2,
    features: ['Basic goal tracking', 'Mood check-ins', 'Task suggestions']
  },
  premium: {
    tier: 'premium',
    goalLimit: Infinity,
    features: ['Unlimited goals', 'AI task generation', 'Advanced analytics', 'Priority support']
  }
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'premium'>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('subscription_tier')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error);
        } else if (data) {
          setSubscriptionTier(data.subscription_tier as 'free' | 'premium');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const currentTier = SUBSCRIPTION_TIERS[subscriptionTier];

  return {
    subscriptionTier,
    currentTier,
    loading,
    isFeatureAvailable: (feature: string) => currentTier.features.includes(feature),
    canCreateGoal: (currentGoalCount: number) => currentGoalCount < currentTier.goalLimit
  };
};
