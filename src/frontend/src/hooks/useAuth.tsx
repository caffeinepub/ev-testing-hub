import { createActorWithConfig } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActor } from "../backend";
import type { UserProfile, UserRole } from "../backend";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Session {
  username: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  registerWithRole: (name: string, role: UserRole) => Promise<void>;
}

// ─── Session Storage ───────────────────────────────────────────────────────────

const SESSION_KEY = "ev_hub_session";

function getSession(): Session | null {
  try {
    const raw =
      sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }
}

// ─── Context & Provider ────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load persisted session on mount
  useEffect(() => {
    const persisted = getSession();
    if (persisted) {
      setSession(persisted);
    }
    setIsInitializing(false);
  }, []);

  // Build a UserProfile-compatible object from session
  const { data: profile } = useQuery<UserProfile | null>({
    queryKey: ["profile", session?.username],
    queryFn: () => {
      if (!session) return null;
      return {
        name: session.name,
        role: session.role,
        username: session.username,
        principal: {
          toString: () => session.username,
        } as unknown as UserProfile["principal"],
        createdAt: BigInt(0),
      } as UserProfile;
    },
    enabled: !!session,
  });

  const login = async (username: string, password: string) => {
    // Use an unauthenticated actor to validate credentials against the backend
    const actor = await createActorWithConfig(createActor);
    const result = await actor.loginWithCredentials(username, password);
    if (result.__kind__ === "err") {
      throw new Error(result.err || "Invalid username or password");
    }
    const userProfile = result.ok;
    const newSession: Session = {
      username: userProfile.username ?? username,
      name: userProfile.name,
      role: userProfile.role,
    };
    saveSession(newSession);
    setSession(newSession);
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const logout = () => {
    saveSession(null);
    setSession(null);
    queryClient.clear();
  };

  // No-op — kept for interface compatibility
  const registerWithRole = async (_name: string, _role: UserRole) => {};

  const isLoggedIn = !!session;
  const isAuthenticated = !!session;
  const isLoading = isInitializing;

  return (
    <AuthContext.Provider
      value={{
        profile: profile ?? null,
        isLoading,
        isAuthenticated,
        isLoggedIn,
        login,
        logout,
        registerWithRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
