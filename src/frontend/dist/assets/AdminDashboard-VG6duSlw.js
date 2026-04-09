import { c as createLucideIcon, g as useTestRecords, h as useTopIssues, b as useVehicleModels, d as useRoutes, j as jsxRuntimeExports, B as Button, i as Link, f as ClipboardList, k as Car, M as MapPin, S as Skeleton, Z as Zap } from "./index-CvDcA4vm.js";
import { B as Badge } from "./badge-BsUQqHHD.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DAQ316_z.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B-QJl9iE.js";
import { A as Activity } from "./activity-aYnLCUbZ.js";
import { T as TriangleAlert } from "./triangle-alert-CZrb98tV.js";
import { T as TrendingUp } from "./trending-up-DAVtAywn.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, b as Legend } from "./LineChart-BByOfBoE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2", key: "1w10f2" }],
  ["line", { x1: "22", x2: "22", y1: "11", y2: "13", key: "4dh1rd" }]
];
const Battery = createLucideIcon("battery", __iconNode);
function computeTopIssues(records, limit) {
  const counts = /* @__PURE__ */ new Map();
  for (const r of records) {
    for (const issue of r.issues) {
      const key = issueFlagName(issue.flag);
      counts.set(key, (counts.get(key) ?? BigInt(0)) + BigInt(1));
    }
  }
  return [...counts.entries()].sort((a, b) => a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0).slice(0, limit);
}
function getRideDate(record) {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1e6;
  }
  return Number(record.timestamp) / 1e6;
}
const CHART_GRID = "oklch(0.88 0 0)";
const CHART_TICK = "oklch(0.45 0 0)";
const TOOLTIP_STYLE = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.88 0 0)",
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};
const TOOLTIP_LABEL = { color: "oklch(0.145 0 0)" };
const issueFlagColor = {
  Safety: "text-red-600 bg-red-50 border-red-200",
  Electrical: "text-amber-600 bg-amber-50 border-amber-200",
  Mechanical: "text-orange-600 bg-orange-50 border-orange-200",
  Software: "text-blue-600 bg-blue-50 border-blue-200",
  Performance: "text-primary bg-primary/8 border-primary/25",
  Other: "text-muted-foreground bg-muted border-border"
};
const issueFlagIcon = {
  Safety: "🔴",
  Electrical: "⚡",
  Mechanical: "🔧",
  Software: "💻",
  Performance: "📊",
  Other: "⚠️"
};
function issueFlagName(flag) {
  if (typeof flag === "string") return flag;
  if (flag && typeof flag === "object") {
    const keys = Object.keys(flag);
    if (keys.length > 0) return keys[0];
  }
  return String(flag);
}
function StatCard({
  title,
  value,
  sub,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `border-border bg-card ${accent ? "border-destructive/30" : ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex h-10 w-10 items-center justify-center rounded-lg ${accent ? "bg-destructive/8 text-destructive" : "bg-primary/8 text-primary"}`,
            children: icon
          }
        )
      ] }) })
    }
  );
}
function buildSpeedData(records) {
  return records.slice(-10).map((r, i) => ({
    label: `T${i + 1}`,
    avg: r.avgSpeedKmh,
    top: r.topSpeedKmh
  }));
}
function buildRangeSocData(records) {
  return records.slice(-8).map((r, i) => ({
    label: `T${i + 1}`,
    range: r.rangeStopKm - r.rangeStartKm,
    startSoc: r.startSoc ?? 0,
    stopSoc: r.stopSoc ?? 0
  }));
}
function AdminDashboard() {
  const { data: records = [], isLoading: recordsLoading } = useTestRecords();
  const { data: topIssuesRaw = [], isLoading: issuesLoading } = useTopIssues(5);
  const { data: models = [], isLoading: modelsLoading } = useVehicleModels();
  const { data: routes = [], isLoading: routesLoading } = useRoutes();
  const topIssues = topIssuesRaw.length > 0 ? topIssuesRaw.map(([flag, count]) => [issueFlagName(flag), count]) : computeTopIssues(records, 5);
  const totalRecords = records.length;
  const avgSoc = records.length > 0 ? (() => {
    const withBoth = records.filter(
      (r) => r.startSoc != null && r.stopSoc != null
    );
    if (withBoth.length === 0) return 0;
    return Math.round(
      withBoth.reduce(
        (s, r) => s + ((r.startSoc ?? 0) - (r.stopSoc ?? 0)),
        0
      ) / withBoth.length
    );
  })() : 0;
  const avgRange = records.length > 0 ? Math.round(
    records.reduce((s, r) => s + (r.rangeStopKm - r.rangeStartKm), 0) / records.length
  ) : 0;
  const totalIssues = records.reduce((s, r) => s + r.issues.length, 0);
  const recentRecords = records.slice(-5).reverse();
  const speedData = buildSpeedData(records);
  const rangeSocData = buildRangeSocData(records);
  const isStatsLoading = recordsLoading || modelsLoading || routesLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "OPG Mobility EV Test Fleet Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            variant: "outline",
            className: "gap-1.5 min-h-[40px]",
            "data-ocid": "quick-action-entry",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/entry", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 14 }),
              " New Entry"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            variant: "outline",
            className: "gap-1.5 min-h-[40px]",
            "data-ocid": "quick-action-models",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/models", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 14 }),
              " Models"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            variant: "outline",
            className: "gap-1.5 min-h-[40px]",
            "data-ocid": "quick-action-routes",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/routes", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
              " Routes"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: isStatsLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Tests",
          value: totalRecords,
          sub: "All sessions",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Vehicle Models",
          value: models.length,
          sub: "Registered EVs",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Test Routes",
          value: routes.length,
          sub: "Active routes",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Issues",
          value: totalIssues,
          sub: "Flagged problems",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20 }),
          accent: totalIssues > 0
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Avg Used SOC %",
          value: `${avgSoc}%`,
          sub: "Avg SOC consumed per test",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Battery, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Avg Range",
          value: `${avgRange} km`,
          sub: "Per test session",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-2 border-destructive/35 bg-red-50",
        "data-ocid": "admin-top-issues",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base tracking-wide text-destructive", children: "⚠ TOP 5 CRITICAL ISSUES / PROBLEMS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Most frequent issues across all test records" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: issuesLoading && recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-md" }, k)) }) : topIssues.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-8 text-center",
              "data-ocid": "top-issues-empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 32, className: "text-muted-foreground mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No issues reported yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Issues appear here as test records are added" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topIssues.map(([flagKey, count], idx) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-3 rounded-lg border px-4 py-3 transition-smooth hover:shadow-sm ${idx === 0 ? "border-destructive/30 bg-red-100/60" : "border-border bg-card"}`,
                "data-ocid": `issue-row-${idx}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold text-destructive w-5 shrink-0", children: [
                    "#",
                    idx + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base shrink-0", children: issueFlagIcon[flagKey] ?? "⚠️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
                      flagKey,
                      " Issue"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Category: ",
                      flagKey
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium shrink-0 ${issueFlagColor[flagKey] ?? "text-muted-foreground bg-muted border-border"}`,
                      children: flagKey
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs shrink-0 border-destructive/30 text-destructive",
                      children: [
                        count.toString(),
                        " × reported"
                      ]
                    }
                  )
                ]
              },
              flagKey
            );
          }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Speed Trends — Top vs Avg (km/h)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : speedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-52 items-center justify-center text-muted-foreground text-sm", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: speedData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: CHART_GRID
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "label",
              tick: { fontSize: 11, fill: CHART_TICK }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 11, fill: CHART_TICK },
              unit: " km/h"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: TOOLTIP_STYLE,
              labelStyle: TOOLTIP_LABEL
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "avg",
              stroke: "oklch(0.45 0.15 230)",
              strokeWidth: 2,
              dot: false,
              name: "Avg Speed"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "top",
              stroke: "oklch(0.55 0.19 22)",
              strokeWidth: 2,
              dot: false,
              name: "Top Speed"
            }
          )
        ] }) }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Range vs SOC — per Session" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : rangeSocData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-52 items-center justify-center text-muted-foreground text-sm", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: rangeSocData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: CHART_GRID
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "label",
              tick: { fontSize: 11, fill: CHART_TICK }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: CHART_TICK } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: TOOLTIP_STYLE,
              labelStyle: TOOLTIP_LABEL
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "range",
              stroke: "oklch(0.45 0.15 230)",
              strokeWidth: 2,
              dot: false,
              name: "Range (km)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "startSoc",
              stroke: "oklch(0.60 0.18 200)",
              strokeWidth: 2,
              dot: false,
              name: "Start SOC%"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "stopSoc",
              stroke: "oklch(0.55 0.16 160)",
              strokeWidth: 2,
              dot: false,
              name: "Stop SOC%"
            }
          )
        ] }) }) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18, className: "text-primary" }),
          " Recent Test Records"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "sm",
            className: "text-xs gap-1",
            "data-ocid": "view-all-reports-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports", children: "View All →" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }, k)) }) : recentRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-12 text-center",
          "data-ocid": "recent-records-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 32, className: "text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No test records yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-3 gap-2", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/entry", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 14 }),
              " Add First Record"
            ] }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Rider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Route" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Start SOC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Stop SOC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Speeds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Issues" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: recentRecords.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "border-border hover:bg-muted/30",
            "data-ocid": `recent-row-${r.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: r.riderName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.vehicleModelName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.routeName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm font-medium", children: r.startSoc != null ? `${r.startSoc}%` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm font-medium", children: r.stopSoc != null ? `${r.stopSoc}%` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-xs text-muted-foreground", children: [
                "↑",
                r.topSpeedKmh,
                " / ~",
                r.avgSpeedKmh
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.issues.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
                r.issues.length
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: new Date(getRideDate(r)).toLocaleDateString() })
            ]
          },
          r.id.toString()
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
