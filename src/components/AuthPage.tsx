
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
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just call onSignIn - in real implementation this would handle auth
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/8c5d43a0-4c58-4d1f-a419-36dd96f5f908.png" 
              alt="Nrvii Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Turn Your Many Passions Into Sustainable Success
            </h1>
            <p className="text-gray-600 text-sm max-w-sm mx-auto">
              The first productivity app that actually cares about your mental health.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSignUp ? 'Create your sanctuary' : 'Continue your journey'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-400"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-blue-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-blue-400"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3"
              >
                {isSignUp ? 'Start Your Journey Free' : 'Continue Journey'}
              </Button>
            </form>
            
            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'New here? Start your journey'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Affirming Message */}
        <div className="text-center">
          <p className="text-gray-600 text-sm italic">
            "You belong here. Your energy matters."
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Help Center</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-700 transition-colors font-medium">Crisis Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
