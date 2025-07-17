
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Battery, 
  Frown, 
  AlertTriangle,
  Heart,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EnergyLevel {
  level: number;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  suggestions: string[];
}

interface EnergyTrackerProps {
  onEnergyChange?: (energy: number) => void;
}

const EnergyTracker = ({ onEnergyChange }: EnergyTrackerProps) => {
  const { user } = useAuth();
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todayEntry, setTodayEntry] = useState<any>(null);
  const [weeklyTrend, setWeeklyTrend] = useState<number[]>([]);

  const energyLevels: EnergyLevel[] = [
    { 
      level: 5, 
      label: 'Energized', 
      icon: Zap, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      description: 'Ready to tackle anything!',
      suggestions: ['Take on challenging projects', 'Start new initiatives', 'Help others', 'Creative work']
    },
    { 
      level: 4, 
      label: 'Focused', 
      icon: Brain, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      description: 'Clear minded and productive',
      suggestions: ['Deep work sessions', 'Important decisions', 'Learning new skills', 'Planning ahead']
    },
    { 
      level: 3, 
      label: 'Neutral', 
      icon: Battery, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      description: 'Steady and balanced',
      suggestions: ['Routine tasks', 'Organization', 'Light exercise', 'Social activities']
    },
    { 
      level: 2, 
      label: 'Tired', 
      icon: Frown, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100',
      description: 'Low energy, need rest',
      suggestions: ['Simple tasks', 'Gentle movement', 'Hydrate', 'Early bedtime']
    },
    { 
      level: 1, 
      label: 'Burned Out', 
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bgColor: 'bg-red-100',
      description: 'Overwhelmed, self-care needed',
      suggestions: ['Rest completely', 'Ask for help', 'Minimum essentials only', 'Self-compassion']
    }
  ];

  useEffect(() => {
    if (user) {
      loadTodayEntry();
      loadWeeklyTrend();
    }
  }, [user]);

  const loadTodayEntry = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('energy_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (data) {
        setTodayEntry(data);
        setSelectedEnergy(data.energy_level);
        setNotes(data.notes || '');
      }
    } catch (error) {
      // No entry for today is fine
    }
  };

  const loadWeeklyTrend = async () => {
    if (!user) return;

    try {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('energy_logs')
        .select('energy_level, date')
        .eq('user_id', user.id)
        .gte('date', weekAgo.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (data) {
        setWeeklyTrend(data.map(entry => entry.energy_level));
      }
    } catch (error) {
      console.error('Error loading weekly trend:', error);
    }
  };

  const handleEnergySelect = async (level: number) => {
    if (!user) {
      setSelectedEnergy(level);
      onEnergyChange?.(level);
      return;
    }

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      if (todayEntry) {
        // Update existing entry
        const { error } = await supabase
          .from('energy_logs')
          .update({
            energy_level: level,
            energy_label: energyLevels.find(e => e.level === level)?.label || '',
            notes: notes,
            context: { timestamp: new Date().toISOString() }
          })
          .eq('id', todayEntry.id);

        if (error) throw error;
      } else {
        // Create new entry
        const { error } = await supabase
          .from('energy_logs')
          .insert({
            user_id: user.id,
            energy_level: level,
            energy_label: energyLevels.find(e => e.level === level)?.label || '',
            notes: notes,
            date: today,
            context: { timestamp: new Date().toISOString() }
          });

        if (error) throw error;
      }

      setSelectedEnergy(level);
      onEnergyChange?.(level);
      
      toast({
        title: "Energy logged! 🌟",
        description: "Thanks for checking in with yourself today."
      });

      loadTodayEntry();
      loadWeeklyTrend();

    } catch (error) {
      console.error('Error saving energy log:', error);
      toast({
        title: "Couldn't save energy log",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedEnergyInfo = selectedEnergy ? energyLevels.find(e => e.level === selectedEnergy) : null;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          How's Your Energy Today?
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Check in with yourself - this helps us suggest the right activities for you
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Energy Level Selection */}
        <div className="grid grid-cols-1 gap-3">
          {energyLevels.map((energy) => {
            const IconComponent = energy.icon;
            const isSelected = selectedEnergy === energy.level;
            
            return (
              <button
                key={energy.level}
                onClick={() => handleEnergySelect(energy.level)}
                disabled={isLoading}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className={`w-12 h-12 rounded-full ${energy.bgColor} flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${energy.color}`} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-800">{energy.label}</div>
                  <div className="text-sm text-gray-600">{energy.description}</div>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">Selected</Badge>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Energy Suggestions */}
        {selectedEnergyInfo && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-2xl">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Gentle Suggestions for Your {selectedEnergyInfo.label} Energy
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedEnergyInfo.suggestions.map((suggestion, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <Textarea
            placeholder="How are you feeling? What's affecting your energy today?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="rounded-xl border-gray-200 focus:border-blue-400"
            rows={2}
          />
        </div>

        {/* Weekly Trend */}
        {weeklyTrend.length > 1 && (
          <div className="bg-gray-50 p-4 rounded-2xl">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Your Week at a Glance
            </h4>
            <div className="flex items-end gap-2 h-12">
              {weeklyTrend.map((level, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-200 rounded-t"
                  style={{ height: `${(level / 5) * 100}%` }}
                  title={`Day ${index + 1}: ${energyLevels.find(e => e.level === level)?.label}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Avg: {(weeklyTrend.reduce((a, b) => a + b, 0) / weeklyTrend.length).toFixed(1)}/5
            </p>
          </div>
        )}

        {todayEntry && (
          <div className="text-center">
            <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-full inline-block">
              ✓ Energy logged for today
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyTracker;
