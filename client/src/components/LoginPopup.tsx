import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, UserCheck, ArrowRight } from "lucide-react";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGuestMode: () => void;
}

export default function LoginPopup({ isOpen, onClose, onGuestMode }: LoginPopupProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({ 
        title: "Missing fields", 
        description: "Please enter both email and password", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({ 
          title: "Sign in failed", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Welcome back!", 
          description: "Successfully signed in" 
        });
        onClose();
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

  const handleSignUp = async () => {
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
          emailRedirectTo: redirectUrl
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
          title: "Account created!", 
          description: "Check your email to confirm your account" 
        });
        onClose();
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

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    try {
      // For demo, just set guest mode
      toast({ 
        title: "Welcome!", 
        description: "Signed in as guest" 
      });
      onGuestMode();
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Welcome to Nrvii
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/30">
            <TabsTrigger value="signin" className="rounded-lg">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 rounded-xl"
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 rounded-xl"
                  disabled={loading}
                />
              </div>
              <Button 
                onClick={handleSignIn} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 rounded-xl"
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 rounded-xl"
                  disabled={loading}
                />
              </div>
              <Button 
                onClick={handleSignUp} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl"
              >
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/20 px-2 text-gray-600">Or</span>
            </div>
          </div>
          
          <Button 
            onClick={handleAnonymousSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white/30 border-white/30 text-gray-700 hover:bg-white/40 rounded-xl"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Continue as Guest
          </Button>
          
          <div className="text-center">
            <button 
              onClick={() => setLocation("/beta-signup")}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Join Beta Program →
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}