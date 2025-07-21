import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowRight } from "lucide-react";

export default function BetaSignup() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async () => {
    if (!email || !password) {
      toast({ 
        title: "Missing fields", 
        description: "Please enter both email and password", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { tier: "beta" }
        }
      });

      if (error) {
        toast({ 
          title: "Signup failed", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Welcome to Nrvii!", 
          description: "Check your email to confirm your account" 
        });
        setLocation("/");
      }
    } catch (err) {
      toast({ 
        title: "Unexpected error", 
        description: "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Nrvii Beta</h2>
          <p className="text-gray-600">Start your mental health & productivity journey</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/50 border-white/30 rounded-xl"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Choose a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/50 border-white/30 rounded-xl"
            disabled={loading}
          />
          <Button 
            onClick={handleSignup} 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-3 font-medium"
          >
            {loading ? (
              "Creating your account..."
            ) : (
              <>
                Begin Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => setLocation("/")}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}