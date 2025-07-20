import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InlineTaskEditorProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export const InlineTaskEditor = ({ initialValue, onSave, onCancel }: InlineTaskEditorProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1"
        autoFocus
      />
      <Button onClick={handleSave} size="sm">Save</Button>
      <Button onClick={onCancel} variant="outline" size="sm">Cancel</Button>
    </div>
  );
};