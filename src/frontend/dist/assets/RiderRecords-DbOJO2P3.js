import { c as createLucideIcon, u as useAuth, g as useTestRecords, b as useVehicleModels, r as reactExports, C as ChartColumn, Z as Zap, j as jsxRuntimeExports, S as Skeleton, I as Input, B as Button, e as Eye, n as reactDomExports, X } from "./index-LhnIGNVd.js";
import { B as Badge } from "./badge-C6aQCMFb.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-BcTxOoEl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D-RGOwUB.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B6Wvfssr.js";
import { P as PhotoGallery } from "./PhotoGallery-DFVBPCT5.js";
import { T as TrendingUp } from "./trending-up-PPf28GpD.js";
import { T as TriangleAlert } from "./triangle-alert-BOooZED3.js";
import { F as Funnel } from "./funnel-Bu56et5N.js";
import { C as CircleCheck } from "./circle-check-DnX9_Tnv.js";
import { C as Camera } from "./camera-CzXtr-kA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
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
function getRideDate(record) {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1e6;
  }
  return Number(record.timestamp) / 1e6;
}
function issueFlagName(flag) {
  if (typeof flag === "string") return flag;
  if (flag && typeof flag === "object") {
    const keys = Object.keys(flag);
    if (keys.length > 0) return keys[0];
  }
  return String(flag);
}
function RecordDetailModal({
  record,
  onClose
}) {
  const date = new Date(getRideDate(record));
  reactExports.useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
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
    { label: "Testing Mode", value: formatTestingMode(record.testingMode) },
    {
      label: "Rider Weight",
      value: record.riderWeight != null ? `${record.riderWeight} kg` : "—"
    },
    {
      label: "Co-rider Weight",
      value: record.coRiderWeight != null ? `${record.coRiderWeight} kg` : "—"
    },
    { label: "Test Purpose", value: formatTestPurpose(record.testPurpose) }
  ];
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
        "data-ocid": "record-detail-modal",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-black/50",
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
                  "data-ocid": "close-record-detail",
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
                record.issues.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-green-600" }),
                  "No issues reported"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: record.issues.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  `issue-${issueFlagName(issue.flag)}-${i}`
                )) })
              ] }),
              record.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5", children: "Notes / Remarks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2 break-words", children: record.notes })
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
        ]
      }
    ),
    document.body
  );
}
function RiderRecords() {
  const { profile } = useAuth();
  const { data: allRecords = [], isLoading } = useTestRecords();
  const { data: models = [] } = useVehicleModels();
  const [search, setSearch] = reactExports.useState("");
  const [modelFilter, setModelFilter] = reactExports.useState("all");
  const [expandedRecord, setExpandedRecord] = reactExports.useState(null);
  const [detailRecord, setDetailRecord] = reactExports.useState(null);
  const records = reactExports.useMemo(
    () => allRecords.filter((r) => r.riderName === (profile == null ? void 0 : profile.name)),
    [allRecords, profile]
  );
  const filtered = reactExports.useMemo(() => {
    return records.filter((r) => {
      const matchesSearch = !search || r.vehicleModelName.toLowerCase().includes(search.toLowerCase()) || r.routeName.toLowerCase().includes(search.toLowerCase());
      const matchesModel = modelFilter === "all" || r.vehicleModelId.toString() === modelFilter;
      return matchesSearch && matchesModel;
    });
  }, [records, search, modelFilter]);
  const totalRange = records.reduce(
    (s, r) => s + (r.rangeStopKm - r.rangeStartKm),
    0
  );
  const avgSoc = records.length > 0 ? Math.round(
    records.reduce((s, r) => s + (r.startSoc ?? 0), 0) / records.length
  ) : 0;
  const avgTopSpeed = records.length > 0 ? (records.reduce((s, r) => s + r.topSpeedKmh, 0) / records.length).toFixed(1) : "0";
  const totalIssues = records.reduce((s, r) => s + r.issues.length, 0);
  const statsCards = [
    {
      label: "Sessions",
      value: records.length,
      icon: ChartColumn,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Total Range",
      value: `${totalRange.toFixed(1)} km`,
      icon: TrendingUp,
      color: "text-chart-2",
      bg: "bg-chart-2/10"
    },
    {
      label: "Avg SOC%",
      value: `${avgSoc}%`,
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      label: "Issues Logged",
      value: totalIssues,
      icon: TriangleAlert,
      color: totalIssues > 0 ? "text-destructive" : "text-chart-4",
      bg: totalIssues > 0 ? "bg-destructive/10" : "bg-chart-4/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "Your personal test session history — ",
        records.length,
        " session",
        records.length !== 1 ? "s" : "",
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: isLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) : statsCards.map((s) => {
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 px-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${s.bg} p-2 rounded-lg shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: s.color }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-1", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground truncate", children: s.value })
        ] })
      ] }) }, s.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 17, className: "text-primary" }),
        "Test Sessions",
        filtered.length !== records.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto text-xs font-mono", children: [
          filtered.length,
          " / ",
          records.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search vehicle or route...",
                className: "pl-8 bg-input border-border",
                "data-ocid": "rider-records-search"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: modelFilter, onValueChange: setModelFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SelectTrigger,
              {
                className: "bg-input border-border w-full sm:w-48",
                "data-ocid": "rider-records-model-filter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 13, className: "mr-1.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Models" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Models" }),
              models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id.toString(), children: m.name }, m.id.toString()))
            ] })
          ] }),
          (search || modelFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setSearch("");
                setModelFilter("all");
              },
              className: "text-muted-foreground",
              "data-ocid": "rider-records-clear-filter",
              children: "Clear"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "rider-records-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChartColumn,
                {
                  size: 40,
                  className: "text-muted-foreground mb-3 opacity-40"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: records.length === 0 ? "No sessions recorded yet" : "No sessions match your filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: records.length === 0 ? "Submit your first test session from the Enter Data page" : "Try adjusting your search or filter criteria" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-6 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Vehicle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Route" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Range (km)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Start SOC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Stop SOC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Top Speed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Avg Speed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Issues" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((record) => {
            const rangeKm = (record.rangeStopKm - record.rangeStartKm).toFixed(1);
            const date = new Date(getRideDate(record));
            const recId = record.id.toString();
            const isExpanded = expandedRecord === recId;
            const hasPhotos = record.photoUrls && record.photoUrls.length > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  className: "border-border hover:bg-muted/20 transition-smooth",
                  "data-ocid": `rider-record-${record.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-sm", children: date.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short"
                      }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: date.getFullYear() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm text-foreground", children: record.vehicleModelName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: record.routeName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono text-foreground", children: [
                        record.rangeStartKm,
                        "→",
                        record.rangeStopKm
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-right", children: [
                        rangeKm,
                        " km"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, className: "text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-accent", children: record.startSoc != null ? `${record.startSoc}%` : "—" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, className: "text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-accent", children: record.stopSoc != null ? `${record.stopSoc}%` : "—" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-sm font-mono text-foreground", children: [
                      record.topSpeedKmh,
                      " km/h"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-sm font-mono text-muted-foreground", children: [
                      record.avgSpeedKmh,
                      " km/h"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: record.issues.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TriangleAlert,
                        {
                          size: 13,
                          className: "text-destructive"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-destructive", children: record.issues.length })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheck,
                        {
                          size: 12,
                          className: "text-accent"
                        }
                      ),
                      "None"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setDetailRecord(record),
                          className: "flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-smooth bg-primary/8 hover:bg-primary/15 px-2 py-1 rounded-md",
                          "aria-label": "View full record details",
                          "data-ocid": `view-details-${recId}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 11 }),
                            "Details"
                          ]
                        }
                      ),
                      hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setExpandedRecord(isExpanded ? null : recId),
                          className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": "Toggle photos",
                          "data-ocid": `toggle-photos-${recId}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 11 }),
                            record.photoUrls.length
                          ]
                        }
                      )
                    ] }) })
                  ]
                }
              ),
              isExpanded && hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableRow,
                {
                  className: "border-border bg-muted/10",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 10, className: "py-3 px-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Camera,
                        {
                          size: 13,
                          className: "text-muted-foreground"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                        "Session captures (",
                        record.photoUrls.length,
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoGallery, { urls: record.photoUrls })
                  ] })
                },
                `${recId}-photos`
              )
            ] }, recId);
          }) })
        ] }) })
      ] })
    ] }),
    records.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 15, className: "text-primary" }),
        "Session Averages"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 flex-wrap justify-center sm:justify-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg Top Speed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-display font-bold text-foreground", children: [
            avgTopSpeed,
            " km/h"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg Start SOC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-display font-bold text-accent", children: [
            avgSoc,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg Range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-display font-bold text-foreground", children: [
            records.length > 0 ? (totalRange / records.length).toFixed(1) : "0",
            " ",
            "km"
          ] })
        ] })
      ] })
    ] }),
    detailRecord && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecordDetailModal,
      {
        record: detailRecord,
        onClose: () => setDetailRecord(null)
      }
    )
  ] });
}
export {
  RiderRecords as default
};
