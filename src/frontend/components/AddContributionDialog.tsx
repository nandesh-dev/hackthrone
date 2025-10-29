import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AddContributionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (contribution: {
    task: string;
    category: string;
    effort: string;
  }) => void;
  projectName?: string;
}

export function AddContributionDialog({
  open,
  onClose,
  onSubmit,
  projectName,
}: AddContributionDialogProps) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('writing');
  const [effort, setEffort] = useState('');

  const handleSubmit = () => {
    if (task && category && effort) {
      onSubmit({ task, category, effort });
      setTask('');
      setCategory('writing');
      setEffort('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contribution</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task description</Label>
            <Textarea
              id="task"
              placeholder="Describe your contribution"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="data-analysis">Data Analysis</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="ideation">Ideation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="effort">Effort</Label>
            <Input
              id="effort"
              placeholder="2 hours"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
