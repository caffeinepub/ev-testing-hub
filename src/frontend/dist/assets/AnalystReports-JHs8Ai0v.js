import { g as useTestRecords, b as useVehicleModels, d as useRoutes, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Label, I as Input, l as IssueFlag } from "./index--L95CfR1.js";
import { B as Badge } from "./badge-D4hkwevr.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-CXHFdwVg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3eMgIaDE.js";
import { m as motion } from "./proxy-Dkhmtmqs.js";
const ISSUE_BADGE = {
  [IssueFlag.Safety]: "text-red-600 border-red-300 bg-red-50",
  [IssueFlag.Electrical]: "text-cyan-700 border-cyan-300 bg-cyan-50",
  [IssueFlag.Mechanical]: "text-amber-700 border-amber-300 bg-amber-50",
  [IssueFlag.Software]: "text-violet-700 border-violet-300 bg-violet-50",
  [IssueFlag.Performance]: "text-lime-700 border-lime-300 bg-lime-50",
  [IssueFlag.Other]: "text-orange-700 border-orange-300 bg-orange-50"
};
function getRideDateMs(record) {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1e6;
  }
  return Number(record.timestamp) / 1e6;
}
function tsToDate(record) {
  return new Date(getRideDateMs(record)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function tsToISO(record) {
  return new Date(getRideDateMs(record)).toISOString().slice(0, 10);
}
function socColor(soc) {
  if (soc == null) return "#94a3b8";
  if (soc >= 60) return "#65a30d";
  if (soc >= 30) return "#d97706";
  return "#dc2626";
}
function rangeColor(km) {
  if (km >= 50) return "#65a30d";
  if (km >= 25) return "#d97706";
  return "#dc2626";
}
function formatSoc(val) {
  return val != null ? `${val}%` : "—";
}
function FilterPanel({
  filters,
  modelOptions,
  routeOptions,
  onChange,
  totalShown,
  totalAll
}) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", "data-ocid": "analyst-filter-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Filter Records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
        "Showing ",
        totalShown,
        " of ",
        totalAll
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Date From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: filters.dateFrom,
            onChange: (e) => set("dateFrom", e.target.value),
            className: "bg-background border-input text-foreground text-sm h-10",
            "data-ocid": "filter-date-from"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Date To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: filters.dateTo,
            onChange: (e) => set("dateTo", e.target.value),
            className: "bg-background border-input text-foreground text-sm h-10",
            "data-ocid": "filter-date-to"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Vehicle Model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.modelId,
            onValueChange: (v) => set("modelId", v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "bg-background border-input text-sm h-10",
                  "data-ocid": "filter-model",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All models" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All models" }),
                modelOptions.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.name }, m.id))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Route" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.routeId,
            onValueChange: (v) => set("routeId", v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "bg-background border-input text-sm h-10",
                  "data-ocid": "filter-route",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All routes" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All routes" }),
                routeOptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Rider Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: "Search rider…",
            value: filters.rider,
            onChange: (e) => set("rider", e.target.value),
            className: "bg-background border-input text-foreground text-sm h-10",
            "data-ocid": "filter-rider"
          }
        )
      ] })
    ] }) })
  ] });
}
function RecordRow({ record, index }) {
  const rangeAchieved = Math.max(0, record.rangeStopKm - record.rangeStartKm);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2, delay: Math.min(index * 0.02, 0.3) },
      className: "border-b border-border hover:bg-muted/20 transition-colors",
      "data-ocid": `record-row-${record.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap", children: tsToDate(record) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm font-medium text-foreground whitespace-nowrap", children: record.vehicleModelName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-muted-foreground whitespace-nowrap", children: record.routeName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-foreground whitespace-nowrap", children: record.riderName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground", children: record.rangeStartKm }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground", children: record.rangeStopKm }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right tabular-nums whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-sm font-semibold",
            style: { color: rangeColor(rangeAchieved) },
            children: [
              rangeAchieved,
              " km"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: socColor(record.startSoc) }, children: formatSoc(record.startSoc) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: socColor(record.stopSoc) }, children: formatSoc(record.stopSoc) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-foreground", children: [
          record.topSpeedKmh,
          " km/h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground", children: [
          record.avgSpeedKmh,
          " km/h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 min-w-[100px]", children: record.issues.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) : record.issues.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: `text-[10px] px-1.5 py-0 ${ISSUE_BADGE[issue.flag] ?? ""}`,
            title: issue.description,
            children: issue.flag
          },
          `${issue.flag}-${i}`
        )) }) })
      ]
    }
  );
}
function EmptyState({ filtered }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 12, className: "text-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      className: "flex flex-col items-center gap-3",
      "data-ocid": "analyst-reports-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: filtered ? "🔍" : "📋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: filtered ? "No matching records" : "No test records yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: filtered ? "Try adjusting your filter criteria" : "Records will appear here once riders submit tests" })
      ]
    }
  ) }) });
}
function AnalystReports() {
  const { data: records = [], isLoading: loadingRecords } = useTestRecords();
  const { data: models = [], isLoading: loadingModels } = useVehicleModels();
  const { data: routes = [], isLoading: loadingRoutes } = useRoutes();
  const isLoading = loadingRecords || loadingModels || loadingRoutes;
  const [filters, setFilters] = reactExports.useState({
    dateFrom: "",
    dateTo: "",
    modelId: "all",
    routeId: "all",
    rider: ""
  });
  const modelOptions = reactExports.useMemo(
    () => models.map((m) => ({ id: m.id.toString(), name: m.name })),
    [models]
  );
  const routeOptions = reactExports.useMemo(
    () => routes.map((r) => ({ id: r.id.toString(), name: r.name })),
    [routes]
  );
  const filtered = reactExports.useMemo(() => {
    return records.filter((r) => {
      const dateStr = tsToISO(r);
      if (filters.dateFrom && dateStr < filters.dateFrom) return false;
      if (filters.dateTo && dateStr > filters.dateTo) return false;
      if (filters.modelId !== "all" && r.vehicleModelId.toString() !== filters.modelId)
        return false;
      if (filters.routeId !== "all" && r.routeId.toString() !== filters.routeId)
        return false;
      if (filters.rider && !r.riderName.toLowerCase().includes(filters.rider.toLowerCase()))
        return false;
      return true;
    });
  }, [records, filters]);
  const hasActiveFilter = filters.dateFrom !== "" || filters.dateTo !== "" || filters.modelId !== "all" || filters.routeId !== "all" || filters.rider !== "";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "analyst-reports-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-lg" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", "data-ocid": "analyst-reports", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Test Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "View-only — all recorded EV test parameters" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterPanel,
      {
        filters,
        modelOptions,
        routeOptions,
        onChange: setFilters,
        totalShown: filtered.length,
        totalAll: records.length
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border-border bg-card overflow-hidden",
            "data-ocid": "analyst-reports-table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30 sticky top-0", children: [
                  { label: "Date", align: "left" },
                  { label: "Model", align: "left" },
                  { label: "Route", align: "left" },
                  { label: "Rider", align: "left" },
                  { label: "Start km", align: "right" },
                  { label: "Stop km", align: "right" },
                  { label: "Range", align: "right" },
                  { label: "Start SOC", align: "right" },
                  { label: "Stop SOC", align: "right" },
                  { label: "Top Speed", align: "right" },
                  { label: "Avg Speed", align: "right" },
                  { label: "Issues", align: "left" }
                ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: `px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${h.align === "right" ? "text-right" : "text-left"}`,
                    children: h.label
                  },
                  h.label
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filtered: hasActiveFilter }) : filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecordRow, { record: r, index: i }, r.id.toString())) })
              ] }) }),
              filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  filtered.length,
                  " record",
                  filtered.length !== 1 ? "s" : "",
                  " ",
                  "displayed"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "View only — no export for Analyst role" })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AnalystReports as default
};
