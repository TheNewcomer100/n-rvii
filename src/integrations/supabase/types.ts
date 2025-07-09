export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string | null
          icon: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          anonymous_name: string | null
          content: string
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          post_type: string | null
          reactions: Json | null
          reply_count: number | null
          user_id: string
        }
        Insert: {
          anonymous_name?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          post_type?: string | null
          reactions?: Json | null
          reply_count?: number | null
          user_id: string
        }
        Update: {
          anonymous_name?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          post_type?: string | null
          reactions?: Json | null
          reply_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      energy_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          date: string
          energy_label: string
          energy_level: number
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          date?: string
          energy_label: string
          energy_level: number
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          date?: string
          energy_label?: string
          energy_level?: number
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          achievable: string | null
          category: string | null
          completed: boolean | null
          created_at: string | null
          date: string
          description: string | null
          goal_icon: string | null
          goal_text: string
          id: number
          measurable: string | null
          priority: number
          progress_percentage: number | null
          relevant: string | null
          specific: string | null
          target_energy_level: number | null
          time_bound: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          achievable?: string | null
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          date: string
          description?: string | null
          goal_icon?: string | null
          goal_text: string
          id?: number
          measurable?: string | null
          priority: number
          progress_percentage?: number | null
          relevant?: string | null
          specific?: string | null
          target_energy_level?: number | null
          time_bound?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievable?: string | null
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          date?: string
          description?: string | null
          goal_icon?: string | null
          goal_text?: string
          id?: number
          measurable?: string | null
          priority?: number
          progress_percentage?: number | null
          relevant?: string | null
          specific?: string | null
          target_energy_level?: number | null
          time_bound?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string | null
          date: string
          id: string
          mood: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          mood: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          mood?: string
          user_id?: string | null
        }
        Relationships: []
      }
      moods: {
        Row: {
          created_at: string | null
          date: string
          id: number
          mood_color: string | null
          mood_emoji: string | null
          mood_level: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          mood_color?: string | null
          mood_emoji?: string | null
          mood_level: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          mood_color?: string | null
          mood_emoji?: string | null
          mood_level?: number
          user_id?: string | null
        }
        Relationships: []
      }
      onboarding_progress: {
        Row: {
          completed_steps: string[] | null
          created_at: string | null
          current_step: number | null
          id: string
          preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_steps?: string[] | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_steps?: string[] | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          content: string
          created_at: string | null
          date: string
          id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          date: string
          id?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          date?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string | null
          id: number
          last_streak_date: string | null
          reminder_time: string | null
          streak_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_streak_date?: string | null
          reminder_time?: string | null
          streak_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_streak_date?: string | null
          reminder_time?: string | null
          streak_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sick_days: {
        Row: {
          created_at: string | null
          date: string
          id: number
          reason: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          reason?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      streak_freezes: {
        Row: {
          created_at: string | null
          freeze_date: string
          id: string
          notes: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          freeze_date: string
          id?: string
          notes?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          freeze_date?: string
          id?: string
          notes?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_check_in: string | null
          longest_streak: number | null
          sick_days: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_check_in?: string | null
          longest_streak?: number | null
          sick_days?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_check_in?: string | null
          longest_streak?: number | null
          sick_days?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string
          description: string | null
          energy_required: number | null
          estimated_duration: number | null
          goal_id: string | null
          id: string
          priority_score: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date: string
          description?: string | null
          energy_required?: number | null
          estimated_duration?: number | null
          goal_id?: string | null
          id?: string
          priority_score?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          description?: string | null
          energy_required?: number | null
          estimated_duration?: number | null
          goal_id?: string | null
          id?: string
          priority_score?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          display_preferences: Json | null
          id: string
          notification_settings: Json | null
          privacy_settings: Json | null
          subscription_tier: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_preferences?: Json | null
          id?: string
          notification_settings?: Json | null
          privacy_settings?: Json | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_preferences?: Json | null
          id?: string
          notification_settings?: Json | null
          privacy_settings?: Json | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          onboarding_complete: boolean | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          onboarding_complete?: boolean | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          onboarding_complete?: boolean | null
          username?: string | null
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          energy_trends: Json | null
          generated_at: string | null
          goal_progress: Json | null
          id: string
          insights: string[] | null
          productivity_metrics: Json | null
          user_id: string
          week_start: string
        }
        Insert: {
          energy_trends?: Json | null
          generated_at?: string | null
          goal_progress?: Json | null
          id?: string
          insights?: string[] | null
          productivity_metrics?: Json | null
          user_id: string
          week_start: string
        }
        Update: {
          energy_trends?: Json | null
          generated_at?: string | null
          goal_progress?: Json | null
          id?: string
          insights?: string[] | null
          productivity_metrics?: Json | null
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
