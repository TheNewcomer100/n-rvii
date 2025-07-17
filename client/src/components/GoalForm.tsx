import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Goal } from "@/types/dashboard";
import { Star, Target, Heart, Sparkles, Calendar } from "lucide-react";

interface GoalFormProps {
  onGoalCreate: (goal: Goal) => void;
  onCancel: () => void;
}

const GoalForm = ({ onGoalCreate, onCancel }: GoalFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
    priority: 'medium',
    category: 'personal',
    targetDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      targetDate: formData.targetDate,
      completed: false,
      specific: formData.specific,
      measurable: formData.measurable,
      achievable: formData.achievable,
      relevant: formData.relevant,
      timeBound: formData.timeBound,
      priority: formData.priority
    };

    onGoalCreate(goal);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/90 to-green-50/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100/60 via-blue-100/60 to-green-100/60">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span>Create Your SMART Goal</span>
          <Sparkles className="w-6 h-6 text-purple-500" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-purple-500" />
              <span>Goal Title</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What's your inspiring goal?"
              className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 py-4 px-4 text-gray-700 text-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-600">
              Brief Description (optional)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Additional context about your goal..."
              className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 py-3 px-4 text-gray-700 min-h-[80px]"
            />
          </div>

          {/* SMART Criteria */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-blue-500" />
              <span>SMART Framework</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specific" className="text-sm font-medium text-gray-600">
                  <strong>S</strong>pecific - What exactly will you accomplish?
                </Label>
                <Input
                  id="specific"
                  value={formData.specific}
                  onChange={(e) => handleChange('specific', e.target.value)}
                  placeholder="Be precise and clear..."
                  className="rounded-xl border border-blue-200 focus:border-blue-400 bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurable" className="text-sm font-medium text-gray-600">
                  <strong>M</strong>easurable - How will you track progress?
                </Label>
                <Input
                  id="measurable"
                  value={formData.measurable}
                  onChange={(e) => handleChange('measurable', e.target.value)}
                  placeholder="Define success metrics..."
                  className="rounded-xl border border-blue-200 focus:border-blue-400 bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievable" className="text-sm font-medium text-gray-600">
                  <strong>A</strong>chievable - Is this realistic for you?
                </Label>
                <Input
                  id="achievable"
                  value={formData.achievable}
                  onChange={(e) => handleChange('achievable', e.target.value)}
                  placeholder="Consider your resources..."
                  className="rounded-xl border border-blue-200 focus:border-blue-400 bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relevant" className="text-sm font-medium text-gray-600">
                  <strong>R</strong>elevant - Why does this matter to you?
                </Label>
                <Input
                  id="relevant"
                  value={formData.relevant}
                  onChange={(e) => handleChange('relevant', e.target.value)}
                  placeholder="Connect to your values..."
                  className="rounded-xl border border-blue-200 focus:border-blue-400 bg-white/90"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="timeBound" className="text-sm font-medium text-gray-600">
                  <strong>T</strong>ime-bound - When will you complete this?
                </Label>
                <Input
                  id="timeBound"
                  value={formData.timeBound}
                  onChange={(e) => handleChange('timeBound', e.target.value)}
                  placeholder="Set a clear deadline..."
                  className="rounded-xl border border-blue-200 focus:border-blue-400 bg-white/90"
                />
              </div>
            </div>
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-600">
                Priority Level
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger className="rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white/90">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-600">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className="rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white/90">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="relationships">Relationships</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetDate" className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Target Date</span>
              </Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleChange('targetDate', e.target.value)}
                className="rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white/90"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button
              type="submit"
              className="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 font-semibold shadow-lg transition-all duration-200 hover:shadow-xl text-lg"
            >
              <Star className="w-5 h-5 mr-3" />
              Plant This Goal
              <Sparkles className="w-5 h-5 ml-3" />
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="rounded-2xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-4 font-medium transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;