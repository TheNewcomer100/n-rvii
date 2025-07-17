
export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  targetDate: string;
  completed: boolean;
  specific?: string;
  measurable?: string;
  achievable?: string;
  relevant?: string;
  timeBound?: string;
  priority?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  ai_generated: boolean;
  goal_id?: string;
  mood_context?: string;
}
