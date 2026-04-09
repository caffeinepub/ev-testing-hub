import { c as createLucideIcon, g as useTestRecords, h as useTopIssues, b as useVehicleModels, d as useRoutes, r as reactExports, j as jsxRuntimeExports, B as Button, i as Link, f as ClipboardList, k as Car, M as MapPin, S as Skeleton, Z as Zap, l as ChevronRight, m as useRecordsByIssueFlag, n as reactDomExports, X, o as Users } from "./index-LhnIGNVd.js";
import { B as Badge } from "./badge-C6aQCMFb.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-BcTxOoEl.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B6Wvfssr.js";
import { P as PhotoGallery } from "./PhotoGallery-DFVBPCT5.js";
import { R as Route, A as Activity, C as Calendar } from "./route-CY7waIjf.js";
import { T as TrendingUp } from "./trending-up-PPf28GpD.js";
import { T as TriangleAlert } from "./triangle-alert-BOooZED3.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, b as Legend } from "./LineChart-D6ls80Hk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2", key: "1w10f2" }],
  ["line", { x1: "22", x2: "22", y1: "11", y2: "13", key: "4dh1rd" }]
];
const Battery = createLucideIcon("battery", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
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
const issueFlagBg = {
  Safety: "bg-red-600",
  Electrical: "bg-amber-500",
  Mechanical: "bg-orange-500",
  Software: "bg-blue-600",
  Performance: "bg-primary",
  Other: "bg-muted-foreground"
};
const issueFlagHeaderBg = {
  Safety: "bg-red-50 border-red-200",
  Electrical: "bg-amber-50 border-amber-200",
  Mechanical: "bg-orange-50 border-orange-200",
  Software: "bg-blue-50 border-blue-200",
  Performance: "bg-primary/5 border-primary/20",
  Other: "bg-muted border-border"
};
const issueFlagTextColor = {
  Safety: "text-red-700",
  Electrical: "text-amber-700",
  Mechanical: "text-orange-700",
  Software: "text-blue-700",
  Performance: "text-primary",
  Other: "text-muted-foreground"
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
function formatTestingMode(mode) {
  if (!mode) return "—";
  if (mode.__kind__ === "Other") return mode.Other || "Other";
  return mode.__kind__;
}
function formatTestPurpose(purpose) {
  if (!purpose) return "—";
  if (purpose.__kind__ === "Others") return purpose.Others || "Others";
  if (purpose.__kind__ === "ComponentTest") return "Component Test";
  return purpose.__kind__;
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
function RecordDetailModal({
  record,
  onClose
}) {
  const date = new Date(getRideDate(record));
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  const fields = [
    {
      label: "Date of Ride",
      value: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    },
    { label: "Rider", value: record.riderName },
    { label: "Vehicle Model", value: record.vehicleModelName },
    {
      label: "Route",
      value: record.customRoute ? `${record.routeName} (Custom: ${record.customRoute})` : record.routeName
    },
    {
      label: "Range",
      value: `${record.rangeStartKm} km → ${record.rangeStopKm} km (${(record.rangeStopKm - record.rangeStartKm).toFixed(1)} km)`
    },
    {
      label: "Start SOC",
      value: record.startSoc != null ? `${record.startSoc}%` : "—"
    },
    {
      label: "Stop SOC",
      value: record.stopSoc != null ? `${record.stopSoc}%` : "—"
    },
    { label: "Top Speed", value: `${record.topSpeedKmh} km/h` },
    { label: "Avg Speed", value: `${record.avgSpeedKmh} km/h` },
    {
      label: "Testing Mode",
      value: formatTestingMode(
        record.testingMode
      )
    },
    {
      label: "Rider Weight",
      value: record.riderWeight != null ? `${record.riderWeight} kg` : "—"
    },
    {
      label: "Co-rider Weight",
      value: record.coRiderWeight != null ? `${record.coRiderWeight} kg` : "—"
    },
    {
      label: "Test Purpose",
      value: formatTestPurpose(
        record.testPurpose
      )
    }
  ];
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[99999] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/60",
          onClick: onClose,
          onKeyDown: (e) => e.key === "Enter" && onClose(),
          role: "button",
          tabIndex: -1,
          "aria-label": "Close details"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-border shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-bold text-foreground", children: "Test Session Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              record.vehicleModelName,
              " · ",
              record.routeName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "ml-3 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Close details",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3", children: fields.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: value })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: [
              "Issues (",
              record.issues.length,
              ")"
            ] }),
            record.issues.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No issues reported" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: record.issues.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 rounded-lg bg-destructive/5 border border-destructive/15 px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      size: 13,
                      className: "text-destructive mt-0.5 shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-destructive", children: issueFlagName(issue.flag) }),
                    issue.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 break-words", children: issue.description })
                  ] })
                ]
              },
              `${issueFlagName(issue.flag)}-${i}`
            )) })
          ] }),
          record.photoUrls && record.photoUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: [
              "Photos (",
              record.photoUrls.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoGallery, { urls: record.photoUrls, maxVisible: 8 })
          ] })
        ] })
      ] })
    ] }),
    document.body
  );
}
function IssueDetailModal({
  flagKey,
  totalCount,
  onClose
}) {
  const { data: records = [], isLoading } = useRecordsByIssueFlag(flagKey);
  const [expandedRecord, setExpandedRecord] = reactExports.useState(null);
  const sorted = [...records].sort((a, b) => getRideDate(b) - getRideDate(a));
  const dates = sorted.map((r) => getRideDate(r));
  const firstDate = dates.length > 0 ? Math.min(...dates) : null;
  const latestDate = dates.length > 0 ? Math.max(...dates) : null;
  const uniqueRiders = new Set(sorted.map((r) => r.riderName)).size;
  const uniqueVehicles = new Set(sorted.map((r) => r.vehicleModelName)).size;
  const headerColor = issueFlagHeaderBg[flagKey] ?? "bg-muted border-border";
  const textColor = issueFlagTextColor[flagKey] ?? "text-muted-foreground";
  const dotColor = issueFlagBg[flagKey] ?? "bg-muted-foreground";
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (expandedRecord) {
          setExpandedRecord(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, expandedRecord]);
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-6 overflow-y-auto",
        "data-ocid": "issue-detail-modal",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "fixed inset-0 bg-black/55",
              onClick: onClose,
              onKeyDown: (e) => e.key === "Enter" && onClose(),
              role: "button",
              tabIndex: -1,
              "aria-label": "Close issue detail"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-3xl rounded-2xl bg-background border border-border shadow-2xl my-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-t-2xl border-b px-5 py-5 ${headerColor}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dotColor} text-white text-xl`,
                      children: issueFlagIcon[flagKey] ?? "⚠️"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "h2",
                      {
                        className: `text-xl font-display font-bold ${textColor} leading-tight`,
                        children: [
                          flagKey,
                          " Issues — Drill-Down"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                      "Detailed breakdown of all reported ",
                      flagKey.toLowerCase(),
                      " ",
                      "issues"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "shrink-0 p-2 rounded-lg hover:bg-black/10 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-4xl font-display font-bold ${textColor}`, children: totalCount.toString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-medium", children: [
                  "total occurrences across ",
                  sorted.length,
                  " test session",
                  sorted.length !== 1 ? "s" : ""
                ] })
              ] })
            ] }),
            !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4 border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "First Seen" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: firstDate ? new Date(firstDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) : "—" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Latest" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: latestDate ? new Date(latestDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) : "—" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Riders" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: uniqueRiders })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 13, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Vehicles" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: uniqueVehicles })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[55vh] overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, k)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 32, className: "text-muted-foreground mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No records found for this issue" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: sorted.map((record, idx) => {
              const matchingIssues = record.issues.filter(
                (iss) => issueFlagName(iss.flag) === flagKey
              );
              const rideDate = new Date(getRideDate(record));
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-5 py-4 hover:bg-muted/25 transition-colors",
                  "data-ocid": `issue-record-row-${idx}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground", children: idx + 1 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
                            record.riderName,
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1.5", children: "·" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1.5", children: record.vehicleModelName })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            rideDate.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "·" }),
                            record.routeName
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setExpandedRecord(record),
                          className: "shrink-0 flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors px-2 py-1 rounded-md hover:bg-primary/8",
                          "data-ocid": `issue-record-detail-${idx}`,
                          title: "View full record",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 12 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Full Details" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mb-3", children: matchingIssues.map((iss) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${issueFlagColor[flagKey] ?? "text-muted-foreground bg-muted border-border"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            TriangleAlert,
                            {
                              size: 11,
                              className: "mt-0.5 shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: iss.description || `${flagKey} issue reported` })
                        ]
                      },
                      iss.description ?? issueFlagName(iss.flag)
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { size: 10 }),
                        (record.rangeStopKm - record.rangeStartKm).toFixed(1),
                        " ",
                        "km"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 10 }),
                        "↑",
                        record.topSpeedKmh,
                        " / ~",
                        record.avgSpeedKmh,
                        " km/h"
                      ] }),
                      record.testingMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground", children: [
                        formatTestingMode(
                          record.testingMode
                        ),
                        " ",
                        "mode"
                      ] }),
                      record.testPurpose && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground", children: formatTestPurpose(
                        record.testPurpose
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground", children: [
                        record.issues.length,
                        " issue",
                        record.issues.length !== 1 ? "s" : "",
                        " total"
                      ] })
                    ] })
                  ]
                },
                record.id.toString()
              );
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20 rounded-b-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Showing ",
                sorted.length,
                " session",
                sorted.length !== 1 ? "s" : "",
                " · sorted newest first"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "Close" })
            ] })
          ] }),
          expandedRecord && /* @__PURE__ */ jsxRuntimeExports.jsx(
            RecordDetailModal,
            {
              record: expandedRecord,
              onClose: () => setExpandedRecord(null)
            }
          )
        ]
      }
    ),
    document.body
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
  const [selectedIssue, setSelectedIssue] = reactExports.useState(null);
  const topIssues = topIssuesRaw.length > 0 ? topIssuesRaw.map(([flag, count]) => [issueFlagName(flag), count]) : computeTopIssues(records, 5);
  const todayStart = (() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  })();
  const todayEnd = todayStart + 864e5;
  const dailyRunKm = records.reduce((sum, r) => {
    const rideMs = getRideDate(r);
    if (rideMs >= todayStart && rideMs < todayEnd) {
      return sum + Math.max(0, r.rangeStopKm - r.rangeStartKm);
    }
    return sum;
  }, 0);
  const overallTotalKm = records.reduce(
    (sum, r) => sum + Math.max(0, r.rangeStopKm - r.rangeStartKm),
    0
  );
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: isStatsLoading ? ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-2 border-primary/30 bg-primary/5",
          "data-ocid": "stat-daily-km",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/70 uppercase tracking-wider font-semibold mb-1", children: "Daily Run KM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-primary", children: [
                dailyRunKm.toFixed(1),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium ml-1", children: "km" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total KM driven today" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { size: 20 }) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-2 border-primary/20 bg-primary/3",
          "data-ocid": "stat-overall-km",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/70 uppercase tracking-wider font-semibold mb-1", children: "Overall Total KM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground", children: [
                overallTotalKm.toFixed(1),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium ml-1 text-muted-foreground", children: "km" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Cumulative across all records" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20 }) })
          ] }) })
        }
      )
    ] }) }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Click any issue to see full drill-down with all records, dates, and riders" })
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
              "button",
              {
                type: "button",
                onClick: () => setSelectedIssue({ flagKey, count }),
                className: `w-full flex items-center gap-3 rounded-lg border px-4 py-3 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-left ${idx === 0 ? "border-destructive/30 bg-red-100/60 hover:bg-red-100" : "border-border bg-card hover:bg-muted/40"}`,
                "data-ocid": `issue-row-${idx}`,
                "aria-label": `View details for ${flagKey} issues`,
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
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      size: 16,
                      className: "text-muted-foreground shrink-0"
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
    selectedIssue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      IssueDetailModal,
      {
        flagKey: selectedIssue.flagKey,
        totalCount: selectedIssue.count,
        onClose: () => setSelectedIssue(null)
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
  StatCard,
  AdminDashboard as default,
  getRideDate,
  issueFlagName
};
