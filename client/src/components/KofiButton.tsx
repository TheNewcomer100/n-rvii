import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Crown, Loader2 } from 'lucide-react';

interface KofiButtonProps {
  className?: string;
}

const KofiButton = ({ className }: KofiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark user as paid
      localStorage.setItem('user_paid', 'true');
      
      toast({
        title: "Payment successful!",
        description: "Welcome to Nrvii Pro! Redirecting to your dashboard..."
      });

      // Redirect to paid dashboard after short delay
      setTimeout(() => {
        window.location.href = '/paid-dashboard?paid=true';
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={loading}
      className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Crown className="w-4 h-4 mr-2" />
      )}
      {loading ? 'Processing...' : 'Start for $5'}
    </Button>
  );
};

export default KofiButton;