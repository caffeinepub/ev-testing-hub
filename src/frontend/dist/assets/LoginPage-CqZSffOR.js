import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, b as useVehicleModels, d as useRoutes, U as UserRole, j as jsxRuntimeExports, L as Label, I as Input, E as EyeOff, e as Eye, B as Button, C as ChartColumn, f as ClipboardList } from "./index--L95CfR1.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-CXHFdwVg.js";
import { C as CircleAlert } from "./circle-alert-Bj1kl5DZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const FEATURES = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18 }), label: "Real-time EV test data monitoring" },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18 }),
    label: "Range, SOC, speed data logging"
  },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18 }), label: "Role-based access control" }
];
function LoginPage() {
  const { login, isLoading, isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const { data: vehicleModels = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();
  reactExports.useEffect(() => {
    if (isAuthenticated && profile) {
      if (profile.role === UserRole.Admin) navigate({ to: "/admin" });
      else if (profile.role === UserRole.Rider) navigate({ to: "/rider" });
      else navigate({ to: "/analyst" });
    }
  }, [isAuthenticated, profile, navigate]);
  const handleSignIn = async (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-1/2 flex-col justify-between bg-card border-r border-border p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-primary", children: "EV Testing Hub" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold text-foreground leading-tight", children: [
            "Electric Vehicle",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Testing Dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg leading-relaxed", children: "Comprehensive data logging and analysis for 2-wheeler and 3-wheeler EV field tests." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary", children: f.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: f.label })
        ] }, f.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary mb-1", children: "Fleet Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground", children: [
            vehicleModels.length,
            " Vehicle",
            vehicleModels.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Active testing fleet — ",
            routes.length,
            " route",
            routes.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " OPG Mobility. All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center p-4 sm:p-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center lg:hidden mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-primary", children: "EV Testing Hub" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-2xl", children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Access OPG Mobility EV Testing Platform" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignIn, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "username",
                type: "text",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                placeholder: "Enter username",
                className: "bg-background border-input h-11",
                autoComplete: "username",
                "data-ocid": "login-username-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Enter password",
                  className: "bg-background border-input h-11 pr-11",
                  autoComplete: "current-password",
                  "data-ocid": "login-password-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword((v) => !v),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                }
              )
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14, className: "shrink-0" }),
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-11 text-base font-semibold",
              disabled: isSubmitting || isLoading,
              "data-ocid": "login-submit-btn",
              children: isSubmitting ? "Signing in..." : "Sign In"
            }
          )
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as default
};
