import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserRole } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useRoutes, useVehicleModels } from "../hooks/useBackend";

const FEATURES = [
  { icon: <BarChart3 size={18} />, label: "Real-time EV test data monitoring" },
  {
    icon: <ClipboardList size={18} />,
    label: "Range, SOC, speed data logging",
  },
  { icon: <Lock size={18} />, label: "Role-based access control" },
];

export default function LoginPage() {
  const { login, isLoading, isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { data: vehicleModels = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();

  useEffect(() => {
    if (isAuthenticated && profile) {
      if (profile.role === UserRole.Admin) navigate({ to: "/admin" });
      else if (profile.role === UserRole.Rider) navigate({ to: "/rider" });
      else navigate({ to: "/analyst" });
    }
  }, [isAuthenticated, profile, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter your username and password");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-card border-r border-border p-12">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-bold text-primary">
            EV Testing Hub
          </span>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground leading-tight">
              Electric Vehicle
              <br />
              <span className="text-primary">Testing Dashboard</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Comprehensive data logging and analysis for 2-wheeler and
              3-wheeler EV field tests.
            </p>
          </div>

          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <span className="text-sm text-muted-foreground">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm font-medium text-primary mb-1">
              Fleet Status
            </p>
            <p className="text-2xl font-display font-bold text-foreground">
              {vehicleModels.length} Vehicle
              {vehicleModels.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Active testing fleet — {routes.length} route
              {routes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} OPG Mobility. All rights reserved.
        </p>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 bg-background">
        <div className="w-full max-w-md space-y-5">
          {/* Mobile heading */}
          <div className="flex justify-center lg:hidden mb-6">
            <span className="font-display text-2xl font-bold text-primary">
              EV Testing Hub
            </span>
          </div>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-display text-2xl">Sign In</CardTitle>
              <CardDescription>
                Access OPG Mobility EV Testing Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Login form */}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="bg-background border-input h-11"
                    autoComplete="username"
                    data-ocid="login-username-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="bg-background border-input h-11 pr-11"
                      autoComplete="current-password"
                      data-ocid="login-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold"
                  disabled={isSubmitting || isLoading}
                  data-ocid="login-submit-btn"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
