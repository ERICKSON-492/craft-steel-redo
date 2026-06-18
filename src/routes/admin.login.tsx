import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  component: AdminLogin,
});

function AdminLogin() {
  const { user, isAdmin, isLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate({ to: "/admin/dashboard", replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await signUp(email, password);
        if (error) { toast.error(error.message || "Sign up failed"); return; }
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await signIn(email, password);
        if (error) { toast.error(error.message || "Invalid credentials"); return; }
        toast.success("Signed in");
        // Navigation handled by effect once isAdmin resolves
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="font-display text-xl font-bold text-slate-900">Not authorized</h1>
          <p className="mt-2 text-sm text-slate-600">
            You're signed in as <strong>{user.email}</strong>, but this account does not have admin access.
          </p>
          <button
            onClick={async () => { const { signOut } = useAuth(); await signOut(); }}
            className="mt-4 text-sm font-semibold text-slate-900 underline"
          >
            Sign out
          </button>
          <div className="mt-4">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">← Back to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white">
            <LogIn className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Admin {mode === "signin" ? "Sign In" : "Sign Up"}</h1>
            <p className="text-xs text-slate-500">Elite Steel Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
              placeholder="admin@elitesteel.co.ke"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-500">
          {mode === "signin" ? (
            <>No account? <button onClick={() => setMode("signup")} className="font-semibold text-slate-900 hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("signin")} className="font-semibold text-slate-900 hover:underline">Sign in</button></>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-900">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
