import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Car,
  ChevronRight,
  ClipboardList,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Star,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useChangePassword } from "../hooks/useBackend";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

function getNavItems(role: UserRole): NavItem[] {
  if (role === UserRole.Admin) {
    return [
      {
        label: "Dashboard",
        path: "/admin",
        icon: <LayoutDashboard size={18} />,
      },
      {
        label: "Vehicle Models",
        path: "/admin/models",
        icon: <Car size={18} />,
      },
      { label: "Routes", path: "/admin/routes", icon: <MapPin size={18} /> },
      {
        label: "Data Entry",
        path: "/admin/entry",
        icon: <ClipboardList size={18} />,
      },
      {
        label: "Reports",
        path: "/admin/reports",
        icon: <FileText size={18} />,
      },
      { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
      {
        label: "Import Data",
        path: "/admin/import",
        icon: <Upload size={18} />,
      },
    ];
  }
  if (role === UserRole.Rider) {
    return [
      {
        label: "Enter Data",
        path: "/rider",
        icon: <ClipboardList size={18} />,
      },
      {
        label: "My Records",
        path: "/rider/records",
        icon: <BarChart3 size={18} />,
      },
      {
        label: "My Profile & Rating",
        path: "/rider/profile",
        icon: <Star size={18} />,
      },
    ];
  }
  // Analyst
  return [
    {
      label: "Dashboard",
      path: "/analyst",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Reports",
      path: "/analyst/reports",
      icon: <FileText size={18} />,
    },
  ];
}

function roleBadgeColor(role: UserRole) {
  if (role === UserRole.Admin)
    return "bg-primary/15 text-primary border-primary/30";
  if (role === UserRole.Rider)
    return "bg-accent/15 text-accent border-accent/30";
  return "bg-muted text-muted-foreground border-border";
}

// ─── Change Password Modal ────────────────────────────────────────────────────

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

function ChangePasswordModal({
  open,
  onClose,
  username,
}: ChangePasswordModalProps) {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setValidationError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (newPassword !== confirmPassword) {
      setValidationError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setValidationError("New password must be at least 6 characters.");
      return;
    }

    try {
      await changePassword.mutateAsync({
        username,
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully.");
      handleClose();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to change password.";
      setValidationError(
        msg.toLowerCase().includes("incorrect") ||
          msg.toLowerCase().includes("invalid")
          ? "Current password is incorrect."
          : msg,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-sm bg-background"
        data-ocid="change-password-modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <KeyRound size={16} className="text-primary" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label htmlFor="current-password" className="text-sm font-medium">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                autoComplete="current-password"
                className="pr-10"
                data-ocid="change-password-current"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new-password" className="text-sm font-medium">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                autoComplete="new-password"
                className="pr-10"
                data-ocid="change-password-new"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                autoComplete="new-password"
                className="pr-10"
                data-ocid="change-password-confirm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <p className="text-sm text-destructive" role="alert">
              {validationError}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              data-ocid="change-password-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={changePassword.isPending}
              data-ocid="change-password-submit"
            >
              {changePassword.isPending ? "Saving…" : "Save Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { profile, logout } = useAuth();
  const { pathname } = useLocation();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  if (!profile) return null;

  const navItems = getNavItems(profile.role);
  const username = profile.username ?? profile.name;

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
          <Zap size={20} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-display font-bold text-sidebar-foreground">
            OPG Mobility
          </p>
          <p className="truncate text-xs text-muted-foreground">
            EV Test Platform
          </p>
        </div>
        <button
          type="button"
          onClick={onMobileClose}
          onKeyDown={(e) => e.key === "Enter" && onMobileClose()}
          className="ml-auto rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* User info */}
      <div className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/20 text-sm font-bold text-primary">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {profile.name}
            </p>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                roleBadgeColor(profile.role),
              )}
            >
              {profile.role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              data-ocid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-smooth min-h-[44px]",
                isActive
                  ? "bg-primary/12 text-primary border border-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent",
              )}
            >
              <span
                className={cn(
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {isActive && (
                <ChevronRight size={14} className="ml-auto text-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 min-h-[44px]"
          onClick={() => setChangePasswordOpen(true)}
          data-ocid="nav-change-password"
        >
          <KeyRound size={16} />
          Change Password
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 min-h-[44px]"
          onClick={logout}
          data-ocid="nav-logout"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            role="button"
            tabIndex={0}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onMobileClose}
            onKeyDown={(e) => e.key === "Enter" && onMobileClose()}
            aria-label="Close sidebar"
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border shadow-lg">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Change Password Modal — rendered outside sidebar DOM tree to avoid z-index issues */}
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        username={username}
      />
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden h-10 w-10"
      onClick={onClick}
      aria-label="Open navigation menu"
      data-ocid="nav-mobile-menu"
    >
      <Menu size={20} />
    </Button>
  );
}
