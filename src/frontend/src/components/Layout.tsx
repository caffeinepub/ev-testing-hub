import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MobileMenuButton, Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden shadow-xs">
          <MobileMenuButton onClick={() => setSidebarOpen(true)} />
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-display font-bold text-foreground truncate">
              OPG Mobility
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              data-ocid="nav-notifications"
              className="h-9 w-9"
            >
              <Bell size={18} className="text-muted-foreground" />
            </Button>
            {profile && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 border border-primary/20 text-sm font-bold text-primary">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 px-6 py-3 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} OPG Mobility. All rights reserved.
        </footer>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
