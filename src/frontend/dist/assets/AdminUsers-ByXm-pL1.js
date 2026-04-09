import { c as createLucideIcon, A as useUsers, G as useCreateUserByAdmin, H as useDeleteUserByUsername, J as useUpdateUserRoleByUsername, r as reactExports, U as UserRole, j as jsxRuntimeExports, B as Button, S as Skeleton, K as Users, N as Star, i as Link, e as Eye, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, L as Label, I as Input, E as EyeOff, q as DialogFooter, s as ue, O as useSetAdminRating } from "./index-CvDcA4vm.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DAQ316_z.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-PLUnNzmp.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B-QJl9iE.js";
import { T as Textarea } from "./textarea-D1gFuUZX.js";
import { T as Trash2 } from "./trash-2-Bf-6KIlq.js";
import { C as CircleAlert } from "./circle-alert-B8n25wSl.js";
import { L as LoaderCircle } from "./loader-circle-BksO7P1b.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const roleBadge = {
  [UserRole.Admin]: "bg-primary/12 text-primary border-primary/25",
  [UserRole.Rider]: "bg-accent/12 text-accent border-accent/25",
  [UserRole.Analyst]: "bg-muted text-muted-foreground border-border"
};
function StarSelector({
  value,
  onChange
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const active = hovered || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", "aria-label": "Select rating", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": `${n} star${n > 1 ? "s" : ""}`,
      className: `text-3xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${n <= active ? "text-yellow-500" : "text-muted-foreground/30"}`,
      onClick: () => onChange(n),
      onMouseEnter: () => setHovered(n),
      onMouseLeave: () => setHovered(0),
      children: "★"
    },
    n
  )) });
}
function RateRiderModal({ open, onClose, user }) {
  const setAdminRating = useSetAdminRating();
  const [rating, setRating] = reactExports.useState(
    user.adminRating ? Number(user.adminRating) : 0
  );
  const [comment, setComment] = reactExports.useState(user.adminRatingComment ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a rating");
      return;
    }
    const username = user.username ?? user.name;
    setAdminRating.mutate(
      { username, rating, comment: comment.trim() || null },
      {
        onSuccess: () => {
          ue.success(`Rating saved for ${user.name}`);
          onClose();
        },
        onError: (err) => ue.error(
          err instanceof Error ? err.message : "Failed to save rating"
        )
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border sm:max-w-md",
      "data-ocid": "rate-rider-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18, className: "text-primary" }),
          "Rate ",
          user.name
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Performance Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarSelector, { value: rating, onChange: setRating }),
            rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Selected: ",
              rating,
              "/5"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rate-comment", className: "text-sm font-medium", children: [
              "Comment ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "rate-comment",
                value: comment,
                onChange: (e) => setComment(e.target.value),
                placeholder: "Add notes about this rider's performance…",
                rows: 3,
                className: "bg-background border-input resize-none",
                "data-ocid": "rate-comment-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: setAdminRating.isPending || rating === 0,
                "data-ocid": "submit-rate-btn",
                children: setAdminRating.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                  "Saving…"
                ] }) : "Save Rating"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function AdminUsers() {
  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUserByAdmin();
  const deleteUserMutation = useDeleteUserByUsername();
  const updateRoleMutation = useUpdateUserRoleByUsername();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [rateTarget, setRateTarget] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newUsername, setNewUsername] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [newName, setNewName] = reactExports.useState("");
  const [newRole, setNewRole] = reactExports.useState(UserRole.Rider);
  const [showNewPassword, setShowNewPassword] = reactExports.useState(false);
  const [createError, setCreateError] = reactExports.useState("");
  const handleRoleChange = (user, role) => {
    const username = user.username ?? "";
    if (!username) return;
    updateRoleMutation.mutate(
      { username, newRole: role },
      {
        onSuccess: () => ue.success(`${user.name}'s role updated to ${role}`),
        onError: (err) => ue.error(
          err instanceof Error ? err.message : "Failed to update role"
        )
      }
    );
  };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    const username = deleteTarget.username ?? "";
    if (username === "Admin") {
      ue.error("The default Admin account cannot be deleted");
      setDeleteTarget(null);
      return;
    }
    deleteUserMutation.mutate(username, {
      onSuccess: () => {
        ue.success(`User "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
      },
      onError: (err) => {
        ue.error(
          err instanceof Error ? err.message : "Failed to delete user"
        );
        setDeleteTarget(null);
      }
    });
  };
  const handleCreateUser = (e) => {
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
        role: newRole
      },
      {
        onSuccess: () => {
          ue.success(`User "${newName}" created successfully`);
          setNewUsername("");
          setNewPassword("");
          setNewName("");
          setNewRole(UserRole.Rider);
          setShowCreate(false);
        },
        onError: (err) => {
          setCreateError(
            err instanceof Error ? err.message : "Failed to create user"
          );
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage user accounts and platform access control" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowCreate(true),
          className: "shrink-0 gap-2",
          "data-ocid": "create-user-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }),
            "Add User"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "mt-0.5 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: "How User Accounts Work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
          "Users sign in with a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "username and password" }),
          ". The default Admin account uses ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin / Admin123" }),
          ". Use the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Add User" }),
          " button to create accounts for Riders and Analysts. Accounts are stored globally and accessible from any device."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: Object.values(UserRole).map((role) => {
      const count = users.filter((u) => u.role === role).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            role,
            "s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-8 inline-block" }) : count })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${roleBadge[role]}`,
            children: role
          }
        )
      ] }) }) }, role);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-primary" }),
        " All Users"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "users-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36, className: "text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No users yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'Click "Add User" to create accounts for Riders and Analysts' })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground hidden sm:table-cell", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Current Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Change Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground hidden md:table-cell", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "border-border hover:bg-muted/30",
            "data-ocid": `user-row-${user.username ?? user.name}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-bold text-primary", children: user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground font-mono hidden sm:table-cell", children: user.username ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${roleBadge[user.role]}`,
                  children: user.role
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: user.role,
                  onValueChange: (v) => handleRoleChange(user, v),
                  disabled: updateRoleMutation.isPending,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-9 w-32 bg-background border-input text-xs",
                        "data-ocid": `role-select-${user.username ?? user.name}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(UserRole).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground hidden md:table-cell", children: new Date(
                Number(user.createdAt) / 1e6
              ).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                user.role === UserRole.Rider && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "h-8 px-2 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/5",
                      onClick: () => setRateTarget(user),
                      "data-ocid": `rate-rider-${user.username ?? user.name}`,
                      "aria-label": `Rate ${user.name}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12 }),
                        "Rate"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/admin/riders/$username",
                      params: {
                        username: user.username ?? user.name
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-8 px-2 text-xs gap-1",
                          "data-ocid": `view-profile-${user.username ?? user.name}`,
                          "aria-label": `View profile of ${user.name}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12 }),
                            "Profile"
                          ]
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth",
                    onClick: () => setDeleteTarget(user),
                    disabled: user.username === "Admin" || deleteUserMutation.isPending,
                    "data-ocid": `delete-user-${user.username ?? user.name}`,
                    "aria-label": `Delete ${user.name}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] }) })
            ]
          },
          user.principal.toString()
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showCreate,
        onOpenChange: (open) => !open && setShowCreate(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 18, className: "text-primary" }),
            " Add New User"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateUser, className: "space-y-4 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-name",
                  value: newName,
                  onChange: (e) => setNewName(e.target.value),
                  placeholder: "e.g. Rahul Sharma",
                  className: "bg-background border-input h-10",
                  "data-ocid": "new-user-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-username", children: "Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-username",
                  value: newUsername,
                  onChange: (e) => setNewUsername(e.target.value),
                  placeholder: "e.g. rahul.rider",
                  className: "bg-background border-input h-10",
                  "data-ocid": "new-user-username-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "new-password",
                    type: showNewPassword ? "text" : "password",
                    value: newPassword,
                    onChange: (e) => setNewPassword(e.target.value),
                    placeholder: "Min. 6 characters",
                    className: "bg-background border-input h-10 pr-11",
                    "data-ocid": "new-user-password-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowNewPassword((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showNewPassword ? "Hide password" : "Show password",
                    children: showNewPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-role", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: newRole,
                  onValueChange: (v) => setNewRole(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "new-role",
                        className: "bg-background border-input h-10",
                        "data-ocid": "new-user-role-select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.Admin, children: "Admin — Full access" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.Rider, children: "Rider — Data entry" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.Analyst, children: "Analyst — View only" })
                    ] })
                  ]
                }
              )
            ] }),
            createError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14, className: "shrink-0" }),
              createError
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setShowCreate(false),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: createUserMutation.isPending,
                  "data-ocid": "create-user-submit-btn",
                  children: createUserMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                    "Creating…"
                  ] }) : "Create User"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }),
            " Delete User"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                '"',
                deleteTarget == null ? void 0 : deleteTarget.name,
                '"'
              ] }),
              "?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Role: ",
              deleteTarget == null ? void 0 : deleteTarget.role,
              " · This cannot be undone. The user will lose access immediately."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDeleteTarget(null), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: confirmDelete,
                disabled: deleteUserMutation.isPending,
                "data-ocid": "confirm-delete-user-btn",
                children: deleteUserMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                  "Deleting…"
                ] }) : "Delete User"
              }
            )
          ] })
        ] })
      }
    ),
    rateTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RateRiderModal,
      {
        open: !!rateTarget,
        onClose: () => setRateTarget(null),
        user: rateTarget
      }
    )
  ] });
}
export {
  AdminUsers as default
};
