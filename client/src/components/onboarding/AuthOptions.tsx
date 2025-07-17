
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Apple, Chrome, Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

interface AuthOptionsProps {
  onNext: () => void;
  onBack: () => void;
  onGuest: () => void;
}

const AuthOptions = ({ onNext, onBack, onGuest }: AuthOptionsProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp, signIn, signInWithGoogle, signInWithApple } = useAuth();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, { full_name: name });
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        onNext();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setError('');

    try {
      const result = provider === 'google' 
        ? await signInWithGoogle() 
        : await signInWithApple();

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err: any) {
      setError(err.message || 'Social sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-3xl flex items-center justify-center p-3 shadow-lg">
              <img 
                src="/lovable-uploads/2eadcba7-72a9-45a1-ac44-c612b69aabbd.png" 
                alt="Nrvii Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              {isSignUp ? 'Join Your Sanctuary' : 'Welcome Back'}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {isSignUp 
                ? 'Create your safe space for growth and self-care 🌱' 
                : 'Continue your journey to balanced productivity ✨'
              }
            </p>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-100/60 via-blue-100/60 to-green-100/60 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-purple-500" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Social Auth Options */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialAuth('google')}
                variant="outline"
                className="w-full rounded-2xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center gap-3 py-6 text-gray-700 font-medium transition-all duration-200"
                disabled={loading}
              >
                <Chrome className="w-5 h-5 text-blue-600" />
                Continue with Google
              </Button>
              <Button
                onClick={() => handleSocialAuth('apple')}
                variant="outline"
                className="w-full rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center gap-3 py-6 text-gray-700 font-medium transition-all duration-200"
                disabled={loading}
              >
                <Apple className="w-5 h-5 text-gray-800" />
                Continue with Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-100" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-4 py-2 text-purple-600 font-medium rounded-full">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Auth Form */}
            <form onSubmit={handleEmailAuth} className="space-y-5">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="What should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-2xl border-2 border-purple-100 focus:border-purple-300 bg-purple-50/30 py-6 px-4 text-gray-700 placeholder:text-gray-500"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border-2 border-blue-100 focus:border-blue-300 bg-blue-50/30 py-6 pl-12 pr-4 text-gray-700 placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-2xl border-2 border-green-100 focus:border-green-300 bg-green-50/30 py-6 pr-12 pl-4 text-gray-700 placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="rounded-2xl border-red-200 bg-red-50 text-red-700">
                  <AlertDescription className="font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white py-6 font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>{isSignUp ? 'Create My Sanctuary' : 'Welcome Me Back'}</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'New here? Create your sanctuary'}
              </button>
              
              <div className="border-t border-purple-100 pt-4">
                <Button
                  onClick={onGuest}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-700 hover:bg-purple-50 rounded-2xl px-6 py-3 font-medium transition-all duration-200"
                >
                  Continue as Guest
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={onBack}
                variant="outline"
                className="rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-3 px-6 font-medium transition-all duration-200"
              >
                Back to Welcome
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 underline font-medium">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthOptions;
