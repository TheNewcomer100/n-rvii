// src/pages/BetaSignup.tsx
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function BetaSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp(
      { email, password },
      { data: { tier: "beta" } }
    );
    setLoading(false);

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome!", description: "Redirecting you now…" });
      navigate("/"); // back to / where Index renders Dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Beta Access Signup</h2>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />
        <Button onClick={handleSignup} disabled={loading} className="w-full">
          {loading ? "Signing up…" : "Begin Your Journey"}
        </Button>
      </div>
    </div>
  );
}
