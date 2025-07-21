import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface PieChartEntry {
  id?: string;
  hour: number;
  activity: string;
  date: string;
}

export function usePieChartData() {
  const [entries, setEntries] = useState<PieChartEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const today = new Date().toISOString().split('T')[0];

  const loadTodaysEntries = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pie_chart_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .order('hour');

      if (error) {
        throw error;
      }

      // Create 24-hour array with empty slots
      const hourlyEntries: PieChartEntry[] = Array.from({ length: 24 }, (_, index) => {
        const existingEntry = data?.find(entry => entry.hour === index);
        return {
          id: existingEntry?.id,
          hour: index,
          activity: existingEntry?.activity || '',
          date: today
        };
      });

      setEntries(hourlyEntries);
    } catch (err) {
      console.error('Error loading pie chart entries:', err);
      setError('Failed to load schedule data');
      
      // Create empty 24-hour array as fallback
      const emptyEntries: PieChartEntry[] = Array.from({ length: 24 }, (_, index) => ({
        hour: index,
        activity: '',
        date: today
      }));
      setEntries(emptyEntries);
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (hour: number, activity: string) => {
    if (!user) return;

    try {
      const entryData = {
        user_id: user.id,
        date: today,
        hour,
        activity
      };

      const { error } = await supabase
        .from('pie_chart_entries')
        .upsert(entryData, {
          onConflict: 'user_id,date,hour'
        });

      if (error) {
        throw error;
      }

      // Update local state
      setEntries(prev => prev.map(entry => 
        entry.hour === hour 
          ? { ...entry, activity }
          : entry
      ));

    } catch (err) {
      console.error('Error updating pie chart entry:', err);
      setError('Failed to update schedule');
    }
  };

  const refresh = () => {
    loadTodaysEntries();
  };

  // Check if it's a new day and reset if needed
  useEffect(() => {
    const checkNewDay = () => {
      const currentDate = new Date().toISOString().split('T')[0];
      if (entries.length > 0 && entries[0].date !== currentDate) {
        loadTodaysEntries();
      }
    };

    const interval = setInterval(checkNewDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [entries]);

  useEffect(() => {
    loadTodaysEntries();
  }, [user, today]);

  return {
    entries,
    loading,
    error,
    updateEntry,
    refresh
  };
}