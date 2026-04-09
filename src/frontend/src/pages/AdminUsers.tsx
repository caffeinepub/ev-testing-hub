import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Shield,
  Star,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend";
import { UserRole } from "../backend";
import {
  useCreateUserByAdmin,
  useDeleteUserByUsername,
  useSetAdminRating,
  useUpdateUserRoleByUsername,
  useUsers,
} from "../hooks/useBackend";

const roleBadge: Record<UserRole, string> = {
  [UserRole.Admin]: "bg-primary/12 text-primary border-primary/25",
  [UserRole.Rider]: "bg-accent/12 text-accent border-accent/25",
  [UserRole.Analyst]: "bg-muted text-muted-foreground border-border",
};

// ─── Star Selector ────────────────────────────────────────────────────────────

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  return (
    <div className="flex items-center gap-1" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={`text-3xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
            n <= active ? "text-yellow-500" : "text-muted-foreground/30"
          }`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ─── Rate Rider Modal ─────────────────────────────────────────────────────────

interface RateModalProps {
  open: boolean;
  onClose: () => void;
  user: UserProfile;
}

function RateRiderModal({ open, onClose, user }: RateModalProps) {
  const setAdminRating = useSetAdminRating();
  const [rating, setRating] = useState(
    user.adminRating ? Number(user.adminRating) : 0,
  );
  const [comment, setComment] = useState(user.adminRatingComment ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    const username = user.username ?? user.name;
    setAdminRating.mutate(
      { username, rating, comment: comment.trim() || null },
      {
        onSuccess: () => {
          toast.success(`Rating saved for ${user.name}`);
          onClose();
        },
        onError: (err) =>
          toast.error(
            err instanceof Error ? err.message : "Failed to save rating",
          ),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border sm:max-w-md"
        data-ocid="rate-rider-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Star size={18} className="text-primary" />
            Rate {user.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Performance Rating</Label>
            <StarSelector value={rating} onChange={setRating} />
            {rating > 0 && (
              <p className="text-xs text-muted-foreground">
                Selected: {rating}/5
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-comment" className="text-sm font-medium">
              Comment <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="rate-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add notes about this rider's performance…"
              rows={3}
              className="bg-background border-input resize-none"
              data-ocid="rate-comment-input"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={setAdminRating.isPending || rating === 0}
              data-ocid="submit-rate-btn"
            >
              {setAdminRating.isPending ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Rating"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── AdminUsers Page ──────────────────────────────────────────────────────────

export default function AdminUsers() {
  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUserByAdmin();
  const deleteUserMutation = useDeleteUserByUsername();
  const updateRoleMutation = useUpdateUserRoleByUsername();

  const [deleteTarget, setDeleteTarget] = useState<UserProfile | null>(null);
  const [rateTarget, setRateTarget] = useState<UserProfile | null>(null);

  // Create user form state
  const [showCreate, setShowCreate] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<UserRole>(UserRole.Rider);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleRoleChange = (user: UserProfile, role: UserRole) => {
    const username = user.username ?? "";
    if (!username) return;
    updateRoleMutation.mutate(
      { username, newRole: role },
      {
        onSuccess: () =>
          toast.success(`${user.name}'s role updated to ${role}`),
        onError: (err) =>
          toast.error(
            err instanceof Error ? err.message : "Failed to update role",
          ),
      },
    );
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const username = deleteTarget.username ?? "";
    if (username === "Admin") {
      toast.error("The default Admin account cannot be deleted");
      setDeleteTarget(null);
      return;
    }
    deleteUserMutation.mutate(username, {
      onSuccess: () => {
        toast.success(`User "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
      },
      onError: (err) => {
        toast.error(
          err instanceof Error ? err.message : "Failed to delete user",
        );
        setDeleteTarget(null);
      },
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    if (!newUsername.trim() || !newPassword || !newName.trim()) {
      setCreateError("All fields are required");
      return;
    }
    if (newPassword.length < 6) {
      setCreateError("Password must be at least 6 characters");
      return;
    }
    createUserMutation.mutate(
      {
        username: newUsername.trim(),
        password: newPassword,
        name: newName.trim(),
        role: newRole,
      },
      {
        onSuccess: () => {
          toast.success(`User "${newName}" created successfully`);
          setNewUsername("");
          setNewPassword("");
          setNewName("");
          setNewRole(UserRole.Rider);
          setShowCreate(false);
        },
        onError: (err) => {
          setCreateError(
            err instanceof Error ? err.message : "Failed to create user",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user accounts and platform access control
          </p>
        </div>
        <Button
          onClick={() => setShowCreate(true)}
          className="shrink-0 gap-2"
          data-ocid="create-user-btn"
        >
          <UserPlus size={16} />
          Add User
        </Button>
      </div>

      {/* How it works notice */}
      <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5">
        <Info size={16} className="mt-0.5 shrink-0 text-primary" />
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-primary">
            How User Accounts Work
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Users sign in with a <strong>username and password</strong>. The
            default Admin account uses <strong>Admin / Admin123</strong>. Use
            the <em>Add User</em> button to create accounts for Riders and
            Analysts. Accounts are stored globally and accessible from any
            device.
          </p>
        </div>
      </div>

      {/* Role summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {Object.values(UserRole).map((role) => {
          const count = users.filter((u) => u.role === role).length;
          return (
            <Card key={role} className="bg-card border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{role}s</p>
                    <p className="text-2xl font-display font-bold text-foreground mt-1">
                      {isLoading ? (
                        <Skeleton className="h-7 w-8 inline-block" />
                      ) : (
                        count
                      )}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${roleBadge[role]}`}
                  >
                    {role}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Users table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Shield size={18} className="text-primary" /> All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="users-empty-state"
            >
              <Users size={36} className="text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">No users yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click "Add User" to create accounts for Riders and Analysts
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground hidden sm:table-cell">
                      Username
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Current Role
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Change Role
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground hidden md:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.principal.toString()}
                      className="border-border hover:bg-muted/30"
                      data-ocid={`user-row-${user.username ?? user.name}`}
                    >
                      <TableCell className="font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono hidden sm:table-cell">
                        {user.username ?? "—"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${roleBadge[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(v) =>
                            handleRoleChange(user, v as UserRole)
                          }
                          disabled={updateRoleMutation.isPending}
                        >
                          <SelectTrigger
                            className="h-9 w-32 bg-background border-input text-xs"
                            data-ocid={`role-select-${user.username ?? user.name}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(UserRole).map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                        {new Date(
                          Number(user.createdAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {user.role === UserRole.Rider && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/5"
                                onClick={() => setRateTarget(user)}
                                data-ocid={`rate-rider-${user.username ?? user.name}`}
                                aria-label={`Rate ${user.name}`}
                              >
                                <Star size={12} />
                                Rate
                              </Button>
                              <Link
                                to="/admin/riders/$username"
                                params={{
                                  username: user.username ?? user.name,
                                }}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-xs gap-1"
                                  data-ocid={`view-profile-${user.username ?? user.name}`}
                                  aria-label={`View profile of ${user.name}`}
                                >
                                  <Eye size={12} />
                                  Profile
                                </Button>
                              </Link>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth"
                            onClick={() => setDeleteTarget(user)}
                            disabled={
                              user.username === "Admin" ||
                              deleteUserMutation.isPending
                            }
                            data-ocid={`delete-user-${user.username ?? user.name}`}
                            aria-label={`Delete ${user.name}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog
        open={showCreate}
        onOpenChange={(open) => !open && setShowCreate(false)}
      >
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <UserPlus size={18} className="text-primary" /> Add New User
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4 pt-1">
            <div className="space-y-2">
              <Label htmlFor="new-name">Full Name</Label>
              <Input
                id="new-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="bg-background border-input h-10"
                data-ocid="new-user-name-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-username">Username</Label>
              <Input
                id="new-username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="e.g. rahul.rider"
                className="bg-background border-input h-10"
                data-ocid="new-user-username-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="bg-background border-input h-10 pr-11"
                  data-ocid="new-user-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-role">Role</Label>
              <Select
                value={newRole}
                onValueChange={(v) => setNewRole(v as UserRole)}
              >
                <SelectTrigger
                  id="new-role"
                  className="bg-background border-input h-10"
                  data-ocid="new-user-role-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.Admin}>
                    Admin — Full access
                  </SelectItem>
                  <SelectItem value={UserRole.Rider}>
                    Rider — Data entry
                  </SelectItem>
                  <SelectItem value={UserRole.Analyst}>
                    Analyst — View only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {createError && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                <AlertCircle size={14} className="shrink-0" />
                {createError}
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createUserMutation.isPending}
                data-ocid="create-user-submit-btn"
              >
                {createUserMutation.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive flex items-center gap-2">
              <Trash2 size={18} /> Delete User
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{deleteTarget?.name}"
              </span>
              ?
            </p>
            <p className="text-xs text-muted-foreground">
              Role: {deleteTarget?.role} · This cannot be undone. The user will
              lose access immediately.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteUserMutation.isPending}
              data-ocid="confirm-delete-user-btn"
            >
              {deleteUserMutation.isPending ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rate Rider Modal */}
      {rateTarget && (
        <RateRiderModal
          open={!!rateTarget}
          onClose={() => setRateTarget(null)}
          user={rateTarget}
        />
      )}
    </div>
  );
}
