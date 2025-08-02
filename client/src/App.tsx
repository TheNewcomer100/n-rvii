import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import BetaSignup from "./pages/BetaSignup";
import GuestDashboard from "./pages/GuestDashboard";
import PaidDashboard from "./pages/PaidDashboard";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CrisisSupportPage from "./pages/CrisisSupportPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/app" component={Index} />
            <Route path="/beta-signup" component={BetaSignup} />
            <Route path="/guest-dashboard" component={GuestDashboard} />
            <Route path="/paid-dashboard" component={PaidDashboard} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/crisis" component={CrisisSupportPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
