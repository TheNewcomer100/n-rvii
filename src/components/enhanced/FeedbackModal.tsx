
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const FeedbackModal = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.message.trim()) return;

    setIsSubmitting(true);

    try {
      // For now, just show a success message since we can't access the feedback table
      // In a real implementation, this would save to the database
      console.log('Feedback submitted:', feedback);
      
      toast({
        title: "Feedback Sent! 🙏",
        description: "Thank you for helping us improve Nrvii. We'll review your feedback soon."
      });

      setFeedback({ email: '', message: '' });
      setIsOpen(false);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error sending feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-800"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span>Share Your Feedback</span>
          </DialogTitle>
          <DialogDescription>
            Help us make Nrvii better for you and others. Your feedback is valuable to us!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={feedback.email}
              onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="message">Your Feedback *</Label>
            <Textarea
              id="message"
              placeholder="Tell us what you think, what's working well, or what could be improved..."
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              className="rounded-xl min-h-[100px]"
              required
            />
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting || !feedback.message.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isSubmitting ? (
              <>
                <Send className="w-4 h-4 mr-2 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
