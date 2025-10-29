import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  contribution: {
    task: string;
    category: string;
    effort: string;
    tokens: number;
  } | null;
}

export function VerificationModal({ open, onClose, contribution }: VerificationModalProps) {
  if (!contribution) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center py-6 space-y-6">
          <h2>Verification</h2>
          
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <div className="text-center space-y-1">
            <p>Contribution approved</p>
            <p className="text-3xl">{contribution.tokens} tokens</p>
          </div>

          <div className="w-full space-y-3 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>
              <span className="capitalize">{contribution.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Task</span>
              <span className="capitalize">{contribution.task.split(' ').slice(0, 2).join(' ')}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effort</span>
              <span>{contribution.effort}</span>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
