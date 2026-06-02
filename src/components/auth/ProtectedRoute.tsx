import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase, onAuthStateChanged } from "@/lib/supabase/auth";
import type { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

// Admin emails - configurable via variable d'environnement
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAIL || "")
  .split(",")
  .map((e: string) => e.trim())
  .filter(Boolean);

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F0EB]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8C7B6B]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !ADMIN_EMAILS.includes(user.email || "")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
