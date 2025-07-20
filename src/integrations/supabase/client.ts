import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onneyfycttntqcbvytyt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubmV5ZnljdHRudHFjYnZ5dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3Mjc2NDAsImV4cCI6MjA2NDMwMzY0MH0.dtDW2TH8irX5uVqRCGyf_UfEly2UfVkCOY0ABg3z04s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);