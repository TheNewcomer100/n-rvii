
import { useState, useEffect } from 'react';

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
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'premium'>('free');
  const [loading, setLoading] = useState(false);

  const currentTier = SUBSCRIPTION_TIERS[subscriptionTier];

  return {
    subscriptionTier,
    currentTier,
    loading,
    isFeatureAvailable: (feature: string) => currentTier.features.includes(feature),
    canCreateGoal: (currentGoalCount: number) => currentGoalCount < currentTier.goalLimit
  };
};
