import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import KofiButton from '@/components/KofiButton';
import { 
  Heart, 
  Target, 
  Brain, 
  Calendar, 
  BarChart3, 
  Shield, 
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      icon: Heart,
      title: "Daily Mood Check-ins",
      description: "Track your emotional well-being with beautiful, intuitive mood logging"
    },
    {
      icon: Target,
      title: "SMART Goals",
      description: "Create and track meaningful goals with our guided SMART framework"
    },
    {
      icon: Brain,
      title: "AI Task Suggestions",
      description: "Get personalized task recommendations based on your mood and energy"
    },
    {
      icon: Calendar,
      title: "24-Hour Planner",
      description: "Visual pie chart planning for optimal day structuring"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Beautiful charts and insights to track your mental health journey"
    },
    {
      icon: Shield,
      title: "Sick Day Protection",
      description: "Protect your streaks with compassionate sick day freeze feature"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Manager",
      content: "Nrvii helped me balance productivity with self-care. The mood tracking is game-changing!",
      rating: 5
    },
    {
      name: "David L.",
      role: "Freelance Designer",
      content: "Finally, a productivity app that actually cares about my mental health. Love the sick day feature.",
      rating: 5
    },
    {
      name: "Maya P.",
      role: "Student",
      content: "The SMART goals framework and AI suggestions keep me motivated without overwhelming me.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Nrvii</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowLogin(true)}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign In
              </Button>
              <KofiButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Mental Health + Productivity
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your mindful
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> companion </span>
            for balanced productivity
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nrvii helps you achieve your goals while prioritizing your mental health. 
            Track moods, set SMART goals, and get AI-powered suggestions that adapt to how you're feeling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <KofiButton className="px-8 py-4 text-lg" />
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/guest-dashboard'}
              className="bg-white/80 border-gray-200 text-gray-700 hover:bg-white"
            >
              Try as Guest
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            $5 one-time • Full access • 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for mindful productivity
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by mental health advocates for people who want to achieve more without burning out
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/30 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, fair pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            One payment, lifetime access. No subscriptions, no hidden fees.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Guest */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Guest Mode</h3>
                <p className="text-4xl font-bold text-gray-900 mb-4">Free</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Up to 2 SMART goals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited mood tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Daily reflection journal</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/guest-dashboard'}
                >
                  Try as Guest
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Nrvii Pro</h3>
                <p className="text-4xl font-bold text-gray-900 mb-4">$5</p>
                <p className="text-sm text-gray-600 mb-6">One-time payment</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited SMART goals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>AI-powered task suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>24-hour activity planner</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Sick day streak protection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Progress analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <KofiButton className="w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Loved by mindful achievers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/30">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to start your mindful productivity journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of people who've found balance with Nrvii
          </p>
          <KofiButton className="px-8 py-4 text-lg" />
          <p className="text-sm text-gray-500 mt-4">
            30-day money-back guarantee • Instant access • No subscriptions
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold">Nrvii</span>
            </div>
            <div className="flex space-x-8 text-sm">
              <button onClick={() => window.location.href = '/privacy'}>Privacy</button>
              <button onClick={() => window.location.href = '/terms'}>Terms</button>
              <button onClick={() => window.location.href = '/crisis'}>Crisis Support</button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Nrvii. Built with ❤️ for your mental health.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;