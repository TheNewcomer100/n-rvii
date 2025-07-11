
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Sparkles, Shield } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl flex items-center justify-center p-4 shadow-lg">
              <img 
                src="/lovable-uploads/2eadcba7-72a9-45a1-ac44-c612b69aabbd.png" 
                alt="Nrvii Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Turn Your Many Passions Into Sustainable Success
            </h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Heart className="w-5 h-5 text-pink-400" />
              <p className="text-sm max-w-sm">
                The first productivity app that actually cares about your mental health.
              </p>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-purple-50/50 to-blue-50/50">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              {isSignUp ? 'Create your sanctuary 🌸' : 'Continue your journey 🌟'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 p-4"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 p-4"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 p-4"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isSignUp ? 'Start Your Journey Free' : 'Continue Journey'}
              </Button>
            </form>
            
            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'New here? Start your journey'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Affirming Message */}
        <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-gray-700 font-medium italic">
            "You belong here. Your energy matters."
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-purple-600 transition-colors flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Help Center</span>
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-pink-600 transition-colors font-medium">
              💜 Crisis Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
