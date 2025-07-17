// src/hooks/useAiTasks.ts
import { useState, useEffect } from "react";
import { generateTasks } from "../lib/ai";

type AITask = { id: string; title: string; tag: string };

export function useAiTasks(goal: string, moodScore: number): {
  tasks: AITask[];
  loading: boolean;
  error: string | null;
} {
  const [tasks, setTasks] = useState<AITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!goal) return;

    setLoading(true);
    setError(null);

    const prompt = `Break this goal into 3 creative, achievable tasks under 90 minutes. Goal: "${goal}". Mood: ${moodScore}/10. Focus on side hustles, hobbies, and meaningful progress.`;

    generateTasks(prompt)
      .then((text) => {
        try {
          const parsed: AITask[] = JSON.parse(text);
          setTasks(parsed);
        } catch {
          // Fallback: plain text lines
          const lines = text.split("\n").filter(Boolean);
          const converted = lines.map((line, i) => ({
            id: `ai-${i}`,
            title: line.trim(),
            tag: "AI",
          }));
          setTasks(converted);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [goal, moodScore]);

  return { tasks, loading, error };
}
