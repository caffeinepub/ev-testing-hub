import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, u as useAuth, g as useTestRecords, b as useVehicleModels, C as ChartColumn, Z as Zap, S as Skeleton, I as Input, B as Button } from "./index--L95CfR1.js";
import { B as Badge } from "./badge-D4hkwevr.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-CXHFdwVg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3eMgIaDE.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-0J9YxuF6.js";
import { T as TrendingUp } from "./trending-up-CCc80CFT.js";
import { T as TriangleAlert } from "./triangle-alert-D8Wyv4T1.js";
import { F as Funnel } from "./funnel-DUe4ck2V.js";
import { C as CircleCheck } from "./circle-check-C1M9bucO.js";
import { C as Camera } from "./camera-imtb5vq4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function PhotoGallery({ urls, maxVisible = 4 }) {
  const [lightboxUrl, setLightboxUrl] = reactExports.useState(null);
  if (!urls || urls.length === 0) return null;
  const visible = urls.slice(0, maxVisible);
  const overflow = urls.length - maxVisible;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: visible.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setLightboxUrl(url),
        className: "relative group w-16 h-16 rounded-md overflow-hidden border border-border bg-muted/30 shrink-0 hover:border-primary transition-smooth",
        "aria-label": "View full size",
        "data-ocid": `gallery-thumb-${idx}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: `Test session capture ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ZoomIn,
            {
              size: 14,
              className: "text-background opacity-0 group-hover:opacity-100 transition-smooth"
            }
          ) }),
          idx === maxVisible - 1 && overflow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-background text-xs font-bold", children: [
            "+",
            overflow
          ] }) })
        ]
      },
      `gallery-${url}`
    )) }),
    lightboxUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "dialog",
      {
        className: "fixed inset-0 z-50 m-0 max-w-none max-h-none w-full h-full bg-transparent border-none p-4 flex items-center justify-center",
        open: true,
        onKeyDown: (e) => e.key === "Escape" && setLightboxUrl(null),
        "data-ocid": "photo-lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-foreground/80",
              onClick: () => setLightboxUrl(null),
              onKeyDown: () => {
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl max-h-[90vh] bg-background rounded-xl overflow-hidden shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setLightboxUrl(null),
                className: "absolute top-3 right-3 z-10 bg-background/80 hover:bg-muted rounded-full p-1.5 transition-smooth",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: lightboxUrl,
                alt: "Full size view",
                className: "max-w-full max-h-[85vh] object-contain"
              }
            )
          ] })
        ]
      }
    )
  ] });
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
function getRideDate(record) {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1e6;
  }
  return Number(record.timestamp) / 1e6;
}
function RiderRecords() {
  const { profile } = useAuth();
  const { data: allRecords = [], isLoading } = useTestRecords();
  const { data: models = [] } = useVehicleModels();
  const [search, setSearch] = reactExports.useState("");
  const [modelFilter, setModelFilter] = reactExports.useState("all");
  const [expandedRecord, setExpandedRecord] = reactExports.useState(null);
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Purpose" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Issues" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Photos" })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: formatTestingMode(record.testingMode) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-[110px] truncate", children: formatTestPurpose(record.testPurpose) }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: hasPhotos ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setExpandedRecord(isExpanded ? null : recId),
                        className: "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth",
                        "aria-label": "Toggle photos",
                        "data-ocid": `toggle-photos-${recId}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 12 }),
                          record.photoUrls.length
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
                  ]
                },
                recId
              ),
              isExpanded && hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableRow,
                {
                  className: "border-border bg-muted/10",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 12, className: "py-3 px-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Camera,
                        {
                          size: 13,
                          className: "text-muted-foreground"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Session captures" })
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
    ] })
  ] });
}
export {
  RiderRecords as default
};
