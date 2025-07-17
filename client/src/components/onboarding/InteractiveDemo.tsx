
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Battery, 
  CheckCircle2, 
  Target, 
  Plus, 
  Play,
  ArrowRight,
  Heart,
  Zap,
  Brain,
  Frown,
  AlertTriangle
} from "lucide-react";

interface InteractiveDemoProps {
  onNext: () => void;
  onBack: () => void;
}

const InteractiveDemo = ({ onNext, onBack }: InteractiveDemoProps) => {
  const [demoStep, setDemoStep] = useState(0);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [completedTask, setCompletedTask] = useState(false);
  const [addedGoal, setAddedGoal] = useState(false);

  const energyLevels = [
    { level: 5, label: 'Energized', icon: Zap, color: 'text-green-600', bgColor: 'bg-green-100', description: 'Ready to tackle anything!' },
    { level: 4, label: 'Focused', icon: Brain, color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Clear minded and productive' },
    { level: 3, label: 'Neutral', icon: Battery, color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Steady and balanced' },
    { level: 2, label: 'Tired', icon: Frown, color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Low energy, need rest' },
    { level: 1, label: 'Burned Out', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100', description: 'Overwhelmed, self-care needed' }
  ];

  const demoTasks = [
    { id: 1, title: 'Drink a glass of water', energy: 1, duration: '1 min' },
    { id: 2, title: 'Review morning emails', energy: 3, duration: '15 mins' },
    { id: 3, title: 'Brainstorm new project ideas', energy: 4, duration: '30 mins' },
  ];

  const demoSteps = [
    {
      title: 'Track Your Energy',
      description: 'Start each day by checking in with yourself. How are you feeling right now?',
      component: 'energy'
    },
    {
      title: 'Get Smart Suggestions',
      description: 'Based on your energy, we\'ll suggest tasks that match how you\'re feeling.',
      component: 'tasks'
    },
    {
      title: 'Set Meaningful Goals',
      description: 'Add goals that matter to you. We\'ll help you break them into manageable steps.',
      component: 'goals'
    },
    {
      title: 'Celebrate Progress',
      description: 'Every step counts! Watch your progress grow with gentle encouragement.',
      component: 'progress'
    }
  ];

  const currentStep = demoSteps[demoStep];

  const renderEnergyDemo = () => (
    <div className="space-y-4">
      <p className="text-gray-600 text-center mb-6">
        Try selecting your current energy level:
      </p>
      <div className="grid grid-cols-1 gap-3">
        {energyLevels.map((energy) => {
          const IconComponent = energy.icon;
          return (
            <button
              key={energy.level}
              onClick={() => setSelectedEnergy(energy.level)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selectedEnergy === energy.level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${energy.bgColor} flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${energy.color}`} />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-gray-800">{energy.label}</div>
                <div className="text-sm text-gray-600">{energy.description}</div>
              </div>
              {selectedEnergy === energy.level && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderTasksDemo = () => {
    const matchedTasks = selectedEnergy 
      ? demoTasks.filter(task => task.energy <= selectedEnergy)
      : demoTasks;

    return (
      <div className="space-y-4">
        <p className="text-gray-600 text-center mb-6">
          {selectedEnergy 
            ? `Based on your ${energyLevels.find(e => e.level === selectedEnergy)?.label.toLowerCase()} energy, here are some gentle suggestions:`
            : 'Here\'s how tasks adapt to your energy level:'
          }
        </p>
        <div className="space-y-3">
          {matchedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                completedTask ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => setCompletedTask(true)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  completedTask
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {completedTask && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <div className="flex-1">
                <div className={`font-medium ${completedTask ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                  {task.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {task.duration}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: task.energy }).map((_, i) => (
                      <Battery key={i} className="w-3 h-3 text-blue-500" />
                    ))}
                  </div>
                </div>
              </div>
              {completedTask && (
                <div className="text-green-600 text-sm font-medium">+5 points!</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGoalsDemo = () => (
    <div className="space-y-4">
      <p className="text-gray-600 text-center mb-6">
        Goals are broken into small, manageable steps that respect your energy:
      </p>
      <div className="space-y-3">
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-800">Learn Spanish</span>
            <Badge className="ml-auto">Personal</Badge>
          </div>
          <Progress value={30} className="mb-2" />
          <div className="text-sm text-gray-600">3 of 10 lessons completed</div>
        </div>
        
        {!addedGoal ? (
          <button
            onClick={() => setAddedGoal(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            Try adding a goal
          </button>
        ) : (
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Exercise regularly</span>
              <Badge variant="secondary" className="ml-auto">Health</Badge>
            </div>
            <div className="text-sm text-green-700">
              Great! We'll suggest gentle activities that match your energy level.
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProgressDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">You're doing amazing!</h3>
        <p className="text-gray-600">
          Every small step is progress. Here's how we'll celebrate your journey:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">7</div>
          <div className="text-sm text-blue-800">Day Streak</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-sm text-green-800">Tasks Completed</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">3</div>
          <div className="text-sm text-purple-800">Goals Progress</div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
        <div className="flex items-center gap-2 text-yellow-800">
          <span className="text-lg">🏆</span>
          <span className="font-medium">Achievement Unlocked: First Week Warrior!</span>
        </div>
      </div>
    </div>
  );

  const renderCurrentDemo = () => {
    switch (currentStep.component) {
      case 'energy':
        return renderEnergyDemo();
      case 'tasks':
        return renderTasksDemo();
      case 'goals':
        return renderGoalsDemo();
      case 'progress':
        return renderProgressDemo();
      default:
        return null;
    }
  };

  const canContinue = () => {
    switch (demoStep) {
      case 0: return selectedEnergy !== null;
      case 1: return completedTask;
      case 2: return addedGoal;
      case 3: return true;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Let's Try It Together</h1>
          <p className="text-gray-600">
            Here's a quick interactive tour of how Nrvii works with you, not against you.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === demoStep 
                        ? 'bg-blue-500' 
                        : index < demoStep 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {demoStep + 1} of {demoSteps.length}
              </span>
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {currentStep.title}
            </CardTitle>
            <p className="text-gray-600">{currentStep.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentDemo()}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={demoStep === 0 ? onBack : () => setDemoStep(demoStep - 1)}
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button 
                onClick={demoStep === demoSteps.length - 1 ? onNext : () => setDemoStep(demoStep + 1)}
                disabled={!canContinue()}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white flex items-center gap-2"
              >
                {demoStep === demoSteps.length - 1 ? 'Complete Demo' : 'Next Step'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveDemo;
