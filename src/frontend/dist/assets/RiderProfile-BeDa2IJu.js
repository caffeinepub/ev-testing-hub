import { u as useAuth, T as useGetRiderRating, j as jsxRuntimeExports, i as Link, B as Button, S as Skeleton, K as Star } from "./index--L95CfR1.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-CXHFdwVg.js";
import { A as ArrowLeft, R as Route, C as Calendar, a as Clock } from "./route-YKmpvwS1.js";
import { A as Activity } from "./activity-C60mNILX.js";
import { T as TriangleAlert } from "./triangle-alert-D8Wyv4T1.js";
import { U as User } from "./user-BMs28ufw.js";
function StarDisplay({
  score,
  size = "md"
}) {
  const sizeCls = size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-sm";
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = score >= i + 1;
    const partial = !filled && score > i;
    return { filled, partial, index: i };
  });
  const colorCls = score >= 4 ? "text-green-500" : score >= 3 ? "text-yellow-500" : "text-orange-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center gap-0.5 ${sizeCls}`,
      "aria-label": `Rating: ${score.toFixed(1)} out of 5 stars`,
      role: "img",
      children: stars.map(({ filled, partial, index }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: filled || partial ? colorCls : "text-muted-foreground/30",
          children: filled ? "★" : partial ? "⯨" : "☆"
        },
        index
      ))
    }
  );
}
function scoreColor(score) {
  if (score >= 4) return "text-green-600 bg-green-50 border-green-200";
  if (score >= 3) return "text-yellow-700 bg-yellow-50 border-yellow-200";
  return "text-orange-700 bg-orange-50 border-orange-200";
}
function scoreLabel(score) {
  if (score >= 4.5) return "Excellent";
  if (score >= 4) return "Very Good";
  if (score >= 3) return "Good";
  if (score >= 2) return "Needs Improvement";
  return "Poor";
}
function RatingCard({ rating }) {
  const aiScore = rating.aiScore ?? null;
  const adminRating = rating.adminRating ? Number(rating.adminRating) : null;
  const factors = rating.aiScoreFactors ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }),
        "AI Performance Rating"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: aiScore !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `inline-flex flex-col items-center rounded-xl border px-5 py-3 ${scoreColor(aiScore)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold", children: aiScore.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium mt-0.5", children: scoreLabel(aiScore) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { score: aiScore, size: "lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Based on ride data and behavior analysis" })
          ] })
        ] }),
        factors && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FactorCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { size: 14 }),
              label: "Total Distance",
              value: `${factors.totalKm.toFixed(1)} km`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FactorCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
              label: "Working Days",
              value: Number(factors.workingDays).toString()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FactorCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 14 }),
              label: "Issues Reported",
              value: Number(factors.issueCount).toString()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FactorCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 14 }),
              label: "Behavior Score",
              value: `${(factors.behaviorScore * 100).toFixed(0)}%`
            }
          )
        ] }),
        rating.aiScoreTimestamp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
          "Last calculated:",
          " ",
          new Date(
            Number(rating.aiScoreTimestamp) / 1e6
          ).toLocaleString()
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-dashed border-border py-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Activity,
          {
            size: 28,
            className: "mx-auto text-muted-foreground mb-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No AI rating yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Complete more rides and your score will be calculated" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" }),
        "Admin Rating"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: adminRating !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `inline-flex flex-col items-center rounded-xl border px-4 py-2.5 ${scoreColor(adminRating)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold", children: adminRating }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "/ 5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { score: adminRating, size: "md" })
        ] }),
        rating.adminRatingComment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: rating.adminRatingComment })
        ] }),
        rating.adminRatingTimestamp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
          "Rated on:",
          " ",
          new Date(
            Number(rating.adminRatingTimestamp) / 1e6
          ).toLocaleString()
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-dashed border-border py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 24, className: "mx-auto text-muted-foreground mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "No admin rating yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your supervisor will rate your performance" })
      ] }) })
    ] })
  ] });
}
function FactorCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground mb-1", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: value })
  ] });
}
function RiderProfile() {
  var _a;
  const { profile } = useAuth();
  const username = (profile == null ? void 0 : profile.username) ?? "";
  const { data: rating, isLoading } = useGetRiderRating(username);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9",
          "aria-label": "Back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Profile & Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "View your performance score and AI-calculated rating" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/12 border border-primary/20 text-xl font-bold font-display text-primary", children: ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.charAt(0).toUpperCase()) ?? "R" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: (profile == null ? void 0 : profile.name) ?? "Rider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "@",
          username,
          " · Rider"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "Member since",
          " ",
          (profile == null ? void 0 : profile.createdAt) ? new Date(
            Number(profile.createdAt) / 1e6
          ).toLocaleDateString() : "—"
        ] })
      ] })
    ] }) }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
    ] }) : rating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RatingCard, { rating, username }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 36, className: "mx-auto text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No rating data yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Complete more rides and your rating will appear here" })
    ] }) })
  ] });
}
export {
  RiderProfile as default
};
