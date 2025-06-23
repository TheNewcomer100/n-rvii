
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

interface AuthPageProps {
  onSignIn: () => void;
}

const AuthPage = ({ onSignIn }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-green-200/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo and Brand */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-lg">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Nrvii
            </h1>
            <p className="text-lg font-medium text-gray-700">
              Turn Your Many Passions Into Sustainable Success
            </p>
            <p className="text-sm text-gray-600">
              The first productivity app that actually cares about your mental health.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Start Your Journey'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin ? 'Ready to nurture your focus?' : 'You belong here. Your energy matters.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                {isLogin ? 'Continue Your Journey' : 'Start Your Journey Free'}
              </Button>
            </form>
            
            <div className="text-center space-y-3">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {isLogin ? "New here? Create your sanctuary" : "Already have an account? Welcome back"}
              </button>
              
              <button className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors">
                See How It Works
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Affirming Message */}
        <div className="text-center">
          <p className="text-sm text-gray-600 italic">
            "You belong here. Your energy matters."
          </p>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Help Center</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors font-medium">Crisis Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
