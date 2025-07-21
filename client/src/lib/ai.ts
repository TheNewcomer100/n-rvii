import { TaskSuggestion } from '@/hooks/useAiTasks';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateTasks(prompt: string): Promise<TaskSuggestion[]> {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.warn('VITE_OPENROUTER_API_KEY not found, using fallback tasks');
      return getDefaultTasks();
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Nrvii - Mental Health & Productivity Platform'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful mental health and productivity assistant. Generate task suggestions in JSON format with fields: id, title, tag, description.'
          },
          {
            role: 'user',
            content: `${prompt}\n\nRespond with a JSON array of exactly 3 tasks. Each task should have: id (string), title (string), tag (string), description (string). Tags should be: Mindfulness, Wellness, Productivity, Growth, Physical, Connection, Self-care, or Environment.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in API response');
    }

    // Try to parse JSON from the response
    try {
      const tasks = JSON.parse(content);
      if (Array.isArray(tasks) && tasks.length > 0) {
        return tasks.map((task, index) => ({
          id: task.id || `ai-${Date.now()}-${index}`,
          title: task.title || 'Suggested task',
          tag: task.tag || 'Wellness',
          description: task.description || ''
        }));
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON:', parseError);
    }

    // If parsing fails, return default tasks
    return getDefaultTasks();
    
  } catch (error) {
    console.error('Error generating tasks from AI:', error);
    return getDefaultTasks();
  }
}

function getDefaultTasks(): TaskSuggestion[] {
  return [
    { 
      id: 'default-1', 
      title: 'Take a 5-minute mindfulness break', 
      tag: 'Mindfulness',
      description: 'Focus on your breathing and center yourself'
    },
    { 
      id: 'default-2', 
      title: 'Write down 3 things you\'re grateful for', 
      tag: 'Wellness',
      description: 'Practice gratitude to boost your mood'
    },
    { 
      id: 'default-3', 
      title: 'Do some light stretching', 
      tag: 'Physical',
      description: 'Move your body to release tension'
    }
  ];
}