
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goalTitle, goalCategory, mood, userId, goalId } = await req.json();

    console.log('Generating AI tasks for:', { goalTitle, goalCategory, mood, userId });

    // Create system prompt based on mood and goal
    const systemPrompt = `You are an AI task assistant that generates personalized, actionable tasks to help users achieve their goals. 

IMPORTANT: You must respond with ONLY a valid JSON array of task objects. Do not include any markdown formatting, explanations, or additional text.

Generate exactly 3 specific, actionable tasks for the following goal:
- Goal: "${goalTitle}"
- Category: "${goalCategory}"
- User's current mood: "${mood || 'neutral'}"

Each task should be:
1. Specific and actionable
2. Appropriate for someone feeling ${mood || 'neutral'}
3. Directly related to achieving the goal "${goalTitle}"
4. Completable within a reasonable timeframe

Adjust the task complexity and tone based on the user's mood:
- If energized: suggest more ambitious or challenging tasks
- If focused: suggest deep work or concentrated effort tasks
- If tired: suggest gentler, easier tasks to build momentum
- If stressed: suggest calming, organizing, or preparatory tasks
- If feeling burnout: suggest very small, manageable wins

Response format (JSON array only):
[
  {
    "title": "specific task title",
    "description": "detailed description explaining what to do"
  },
  {
    "title": "specific task title", 
    "description": "detailed description explaining what to do"
  },
  {
    "title": "specific task title",
    "description": "detailed description explaining what to do"
  }
]`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 3 tasks for goal: "${goalTitle}" (category: ${goalCategory}) for someone feeling ${mood || 'neutral'}` }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response:', aiResponse);

    // Parse the AI response
    let tasks;
    try {
      tasks = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to default tasks if parsing fails
      tasks = [
        {
          title: `Plan your approach to "${goalTitle}"`,
          description: "Break down your goal into smaller, manageable steps"
        },
        {
          title: `Research best practices for ${goalCategory}`,
          description: "Find resources and strategies that will help you succeed"
        },
        {
          title: `Take the first small step toward "${goalTitle}"`,
          description: "Start with something simple to build momentum"
        }
      ];
    }

    // Validate and ensure we have exactly 3 tasks
    if (!Array.isArray(tasks) || tasks.length !== 3) {
      console.warn('Invalid task format, using fallback');
      tasks = [
        {
          title: `Begin working on "${goalTitle}"`,
          description: "Take the first concrete step toward achieving this goal"
        },
        {
          title: `Plan your ${goalCategory} strategy`,
          description: "Outline your approach and identify key milestones"
        },
        {
          title: `Set up your environment for "${goalTitle}"`,
          description: "Organize your workspace and gather necessary resources"
        }
      ];
    }

    // Create Supabase client with service role for server-side operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save tasks to database
    const tasksToInsert = tasks.map((task: any) => ({
      user_id: userId,
      goal_id: goalId,
      title: task.title,
      description: task.description,
      ai_generated: true,
      mood_context: mood,
      date: new Date().toISOString().split('T')[0],
      completed: false
    }));

    const { data: insertedTasks, error: insertError } = await supabase
      .from('tasks')
      .insert(tasksToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting tasks:', insertError);
      throw insertError;
    }

    // Log the generation for analytics
    try {
      await supabase
        .from('task_generation_logs')
        .insert({
          user_id: userId,
          goal_id: goalId,
          mood: mood,
          tasks_generated: tasks.length
        });
    } catch (logError) {
      console.error('Error logging task generation:', logError);
      // Don't fail the request if logging fails
    }

    console.log('Successfully generated and saved tasks:', insertedTasks);

    return new Response(JSON.stringify({ 
      success: true, 
      tasks: insertedTasks,
      message: `Generated ${tasks.length} AI-powered tasks for your goal!`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-tasks function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate AI tasks',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
