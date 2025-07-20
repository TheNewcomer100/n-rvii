import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from '@/types/dashboard';

interface InlineTaskEditorProps {
  task: Task;
  onTaskUpdate: (taskId: string, newTitle: string) => void;
}

export const InlineTaskEditor = ({ task, onTaskUpdate }: InlineTaskEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    onTaskUpdate(task.id, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(task.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
        />
        <Button onClick={handleSave} size="sm">Save</Button>
        <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
      </div>
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-gray-50 px-1 py-0.5 rounded transition-colors"
    >
      {task.title}
    </span>
  );
};