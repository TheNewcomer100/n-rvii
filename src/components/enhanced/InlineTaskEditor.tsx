
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

interface InlineTaskEditorProps {
  task: {
    id: string;
    title: string;
    description?: string;
  };
  onTaskUpdate: (taskId: string, newTitle: string) => void;
}

const InlineTaskEditor = ({ task, onTaskUpdate }: InlineTaskEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue.trim() === '' || editValue === task.title) {
      setIsEditing(false);
      setEditValue(task.title);
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ title: editValue.trim() })
        .eq('id', task.id);

      if (error) throw error;

      onTaskUpdate(task.id, editValue.trim());
      setIsEditing(false);
      
      toast({
        title: "Task updated! ✏️",
        duration: 2000,
      });

    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error updating task",
        description: "Please try again.",
        variant: "destructive"
      });
      setEditValue(task.title);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(task.title);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 flex-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 rounded-xl border-blue-200 focus:border-blue-400"
          autoFocus
          disabled={isSaving}
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          disabled={isSaving}
          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={isSaving}
          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 flex-1 group">
      <span className="flex-1 text-gray-800">{task.title}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 p-1"
      >
        <Edit2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default InlineTaskEditor;
