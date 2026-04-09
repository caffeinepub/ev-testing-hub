import { c as createLucideIcon, Y as useParams, $ as useGetRiderRating, a0 as useRecalculateRating, j as jsxRuntimeExports, i as Link, B as Button, S as Skeleton, P as Star, x as ue, r as reactExports, Q as useSetAdminRating, D as Dialog, s as DialogContent, t as DialogHeader, v as DialogTitle, L as Label, w as DialogFooter } from "./index-LhnIGNVd.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-BcTxOoEl.js";
import { T as Textarea } from "./textarea-B-cJ5dVn.js";
import { A as ArrowLeft, C as Clock } from "./clock-dH2Ge_vO.js";
import { A as Activity, R as Route, C as Calendar } from "./route-CY7waIjf.js";
import { T as TriangleAlert } from "./triangle-alert-BOooZED3.js";
import { U as User } from "./user-CPKOp8PI.js";
import { L as LoaderCircle } from "./loader-circle-Bs6ySCyt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
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
function StarDisplay({
  score,
  size = "md"
}) {
  const sizeCls = size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-sm";
  const colorCls = score >= 4 ? "text-green-500" : score >= 3 ? "text-yellow-500" : "text-orange-500";
  const stars = Array.from({ length: 5 }, (_, i) => ({
    filled: score >= i + 1,
    partial: !(score >= i + 1) && score > i,
    index: i
  }));
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
function RateModal({
  open,
  onClose,
  username,
  riderName,
  currentAdminRating
}) {
  const setAdminRating = useSetAdminRating();
  const [rating, setRating] = reactExports.useState(currentAdminRating ?? 0);
  const [comment, setComment] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a star rating");
      return;
    }
    setAdminRating.mutate(
      { username, rating, comment: comment.trim() || null },
      {
        onSuccess: () => {
          ue.success(`Rating saved for ${riderName}`);
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
          riderName
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Performance Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarSelector, { value: rating, onChange: setRating }),
              rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
                rating,
                "/5 · ",
                scoreLabel(rating)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rating-comment", className: "text-sm font-medium", children: [
              "Comment ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "rating-comment",
                value: comment,
                onChange: (e) => setComment(e.target.value),
                placeholder: "Add a note about this rider's performance…",
                rows: 3,
                className: "bg-background border-input resize-none",
                "data-ocid": "rating-comment-input"
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
                "data-ocid": "submit-rating-btn",
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
function RatingCard({
  rating,
  username,
  riderName
}) {
  const recalcMutation = useRecalculateRating();
  const [showRateModal, setShowRateModal] = reactExports.useState(false);
  const aiScore = rating.aiScore ?? null;
  const adminRating = rating.adminRating ? Number(rating.adminRating) : null;
  const factors = rating.aiScoreFactors ?? null;
  const handleRecalc = () => {
    recalcMutation.mutate(username, {
      onSuccess: () => ue.success("Rating recalculated"),
      onError: (err) => ue.error(
        err instanceof Error ? err.message : "Recalculation failed"
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }),
            "AI Performance Rating"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleRecalc,
              disabled: recalcMutation.isPending,
              className: "h-8 gap-1.5 text-xs",
              "data-ocid": "recalculate-rating-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    size: 13,
                    className: recalcMutation.isPending ? "animate-spin" : ""
                  }
                ),
                "Recalculate"
              ]
            }
          )
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Based on KM, days, issues & behavior" })
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
            "Calculated:",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No AI score yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: 'Click "Recalculate" to generate a score' })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" }),
            "Admin Rating"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setShowRateModal(true),
              className: "h-8 gap-1.5 text-xs",
              "data-ocid": "open-rate-modal-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13 }),
                adminRating !== null ? "Update Rating" : "Rate Rider"
              ]
            }
          )
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
            "Rated:",
            " ",
            new Date(
              Number(rating.adminRatingTimestamp) / 1e6
            ).toLocaleString()
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-dashed border-border py-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              size: 24,
              className: "mx-auto text-muted-foreground mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Not yet rated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: 'Click "Rate Rider" to add your assessment' })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RateModal,
      {
        open: showRateModal,
        onClose: () => setShowRateModal(false),
        username,
        riderName,
        currentAdminRating: adminRating
      }
    )
  ] });
}
function AdminRiderProfile() {
  const { username } = useParams({ strict: false });
  const { data: rating, isLoading } = useGetRiderRating(username);
  const recalcMutation = useRecalculateRating();
  const riderName = (rating == null ? void 0 : rating.username) ?? username;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9",
          "aria-label": "Back to Users",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Rider Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          "Performance ratings and score breakdown for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
            "@",
            username
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/12 border border-primary/20 text-xl font-bold font-display text-primary", children: riderName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: riderName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "@",
            username,
            " · Rider"
          ] })
        ] })
      ] }),
      (rating == null ? void 0 : rating.aiScore) != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { score: rating.aiScore, size: "md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: rating.aiScore.toFixed(1) })
      ] })
    ] }) }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-60 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-xl" })
    ] }) : rating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RatingCard, { rating, username, riderName }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 36, className: "mx-auto text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No rating data found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This rider may not have any test records yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "mt-4 gap-2",
          onClick: () => recalcMutation.mutate(username, {
            onSuccess: () => ue.success("Rating calculated"),
            onError: (err) => ue.error(
              err instanceof Error ? err.message : "Failed to calculate rating"
            )
          }),
          disabled: recalcMutation.isPending,
          "data-ocid": "no-rating-refresh-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                size: 14,
                className: recalcMutation.isPending ? "animate-spin" : ""
              }
            ),
            "Calculate Rating"
          ]
        }
      )
    ] }) })
  ] });
}
export {
  AdminRiderProfile as default
};
