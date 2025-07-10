
import { toast } from "@/hooks/use-toast";

type EncouragementType = 'task_complete' | 'mood_checkin' | 'goal_complete' | 'sick_day' | 'streak_milestone';

const ENCOURAGEMENT_MESSAGES: Record<EncouragementType, string[]> = {
  task_complete: [
    "Great job! Keep going! 🌟",
    "You're making progress! ✨",
    "Amazing work! You've got this! 💪",
    "One step closer to your goals! 🎯",
    "Fantastic effort today! 🌈",
    "You're on fire! Keep it up! 🔥",
    "Beautiful progress! 🌸",
    "You're stronger than you think! 💎"
  ],
  mood_checkin: [
    "Thank you for checking in with yourself 💙",
    "Self-awareness is the first step to growth 🌱",
    "Your feelings are valid and important 🤗",
    "Taking time to reflect shows wisdom 🦉",
    "You're being kind to yourself today 💝",
    "Mindfulness is a superpower! 🧘‍♀️"
  ],
  goal_complete: [
    "🎉 Goal completed! You're absolutely amazing!",
    "Incredible achievement! Time to celebrate! 🎊",
    "You did it! Your dedication paid off! 🏆",
    "Outstanding work! You should be proud! 👏",
    "Goal crusher! What's next on your journey? 🚀",
    "Phenomenal! You're unstoppable! ⭐"
  ],
  sick_day: [
    "Self-care is productive too 💙",
    "Rest is part of the journey 🌙",
    "Your wellbeing comes first 🫶",
    "Taking care of yourself is brave 💪",
    "Healing takes time, and that's okay 🌿",
    "You're being wise by listening to your body 🧘‍♀️"
  ],
  streak_milestone: [
    "Streak milestone! You're consistent! 🔥",
    "Your dedication is inspiring! 📈",
    "Building healthy habits one day at a time! 📅",
    "Consistency is your superpower! ⚡",
    "Look at that beautiful streak! 🌟"
  ]
};

export const useEncouragement = () => {
  const showEncouragement = (type: EncouragementType, customMessage?: string) => {
    const messages = ENCOURAGEMENT_MESSAGES[type];
    const message = customMessage || messages[Math.floor(Math.random() * messages.length)];
    
    toast({
      title: message,
      duration: 3000,
    });
  };

  return { showEncouragement };
};

export default useEncouragement;
