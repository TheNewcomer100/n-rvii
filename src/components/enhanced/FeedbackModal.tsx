
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const FeedbackModal = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user?.id || null,
          email,
          message
        });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback! 💙",
        description: "We'll review your message and get back to you soon."
      });

      setEmail('');
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error submitting feedback",
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
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
          <MessageSquare className="w-4 h-4 mr-2" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Thoughts</DialogTitle>
          <DialogDescription>
            Help us improve Nrvii with your feedback and suggestions
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feedback-email">Email</Label>
            <Input
              id="feedback-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
              required
            />
          </div>
          <div>
            <Label htmlFor="feedback-message">Message</Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what you think, report a bug, or suggest a feature..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl min-h-[100px]"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
