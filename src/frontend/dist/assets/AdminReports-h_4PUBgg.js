const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-DMmoDMxn.js","assets/index--L95CfR1.js","assets/index-DKYaoAYW.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, g as useTestRecords, y as useDeleteTestRecord, u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, F as FileText, L as Label, I as Input, S as Skeleton, t as ue, l as IssueFlag, _ as __vitePreload } from "./index--L95CfR1.js";
import { B as Badge } from "./badge-D4hkwevr.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-CXHFdwVg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3eMgIaDE.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-0J9YxuF6.js";
import { F as FileSpreadsheet, D as Download } from "./file-spreadsheet-BQ8-SAXb.js";
import { F as Funnel } from "./funnel-DUe4ck2V.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, c as Legend, a as Line, B as BarChart, b as Bar, d as Cell } from "./BarChart-1l-ppdNd.js";
import { T as TriangleAlert } from "./triangle-alert-D8Wyv4T1.js";
import { T as Trash2 } from "./trash-2-BVNZbHrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
const CHART_GRID = "oklch(0.88 0 0)";
const CHART_TICK = "oklch(0.45 0 0)";
const CHART_TOOLTIP = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.88 0 0)",
  borderRadius: 8,
  fontSize: 11,
  color: "oklch(0.145 0 0)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};
function formatSoc(val) {
  return val != null ? `${val}%` : "—";
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
function buildSpeedData(records) {
  return records.slice(-12).map((r, i) => ({
    label: `T${i + 1}`,
    topSpeed: r.topSpeedKmh,
    avgSpeed: r.avgSpeedKmh,
    rider: r.riderName
  }));
}
function buildRangeSocData(records) {
  return records.slice(-10).map((r, i) => ({
    label: `T${i + 1}`,
    range: Number.parseFloat((r.rangeStopKm - r.rangeStartKm).toFixed(1)),
    startSoc: r.startSoc ?? 0,
    stopSoc: r.stopSoc ?? 0
  }));
}
function buildIssueFreqData(records) {
  const counts = {};
  for (const r of records) {
    for (const issue of r.issues) {
      counts[issue.flag] = (counts[issue.flag] ?? 0) + 1;
    }
  }
  return Object.entries(counts).map(([flag, count]) => ({ flag, count })).sort((a, b) => b.count - a.count);
}
const ISSUE_COLORS = {
  [IssueFlag.Safety]: "oklch(0.55 0.24 25)",
  [IssueFlag.Electrical]: "oklch(0.75 0.18 90)",
  [IssueFlag.Mechanical]: "oklch(0.65 0.19 22)",
  [IssueFlag.Software]: "oklch(0.55 0.15 230)",
  [IssueFlag.Performance]: "oklch(0.72 0.18 110)",
  [IssueFlag.Other]: "oklch(0.6 0 0)"
};
function buildFilterSummary(ctx) {
  const parts = [];
  if (ctx.filters.vehicle !== "all")
    parts.push(`Vehicle: ${ctx.filters.vehicle}`);
  if (ctx.filters.route !== "all") parts.push(`Route: ${ctx.filters.route}`);
  if (ctx.filters.rider.trim()) parts.push(`Rider: ${ctx.filters.rider}`);
  if (ctx.filters.dateFrom) parts.push(`From: ${ctx.filters.dateFrom}`);
  if (ctx.filters.dateTo) parts.push(`To: ${ctx.filters.dateTo}`);
  return parts.length > 0 ? parts.join("  |  ") : "No filters applied";
}
function exportToPdf(ctx) {
  Promise.all([__vitePreload(() => import("./jspdf.es.min-DMmoDMxn.js").then((n) => n.j), true ? __vite__mapDeps([0,1,2]) : void 0), __vitePreload(() => import("./jspdf.plugin.autotable-DHcwasbS.js"), true ? [] : void 0)]).then(
    ([{ default: jsPDF }, { default: autoTable }]) => {
      var _a;
      const doc = new jsPDF({ orientation: "landscape", format: "a4" });
      const pageW = doc.internal.pageSize.width;
      const pageH = doc.internal.pageSize.height;
      doc.setFillColor(10, 25, 35);
      doc.rect(0, 0, pageW, 30, "F");
      doc.setFillColor(0, 180, 140);
      doc.rect(0, 30, pageW, 2, "F");
      doc.setTextColor(0, 220, 180);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("OPG Mobility", 14, 13);
      doc.setTextColor(200, 230, 225);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("EV Test Records Report", 14, 23);
      doc.setTextColor(140, 170, 165);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated by: ${ctx.userName}   |   Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
        pageW - 14,
        13,
        { align: "right" }
      );
      doc.text(
        `Records: ${ctx.records.length}   |   ${buildFilterSummary(ctx)}`,
        pageW - 14,
        21,
        { align: "right" }
      );
      let curY = 38;
      doc.setTextColor(100, 120, 115);
      doc.setFontSize(8);
      doc.text(`Filters: ${buildFilterSummary(ctx)}`, 14, curY);
      curY += 8;
      autoTable(doc, {
        startY: curY,
        head: [
          [
            "#",
            "Rider",
            "Vehicle",
            "Route",
            "Rng Start",
            "Rng Stop",
            "Start SOC",
            "Stop SOC",
            "Top Spd",
            "Avg Spd",
            "Mode",
            "Purpose",
            "Rider Wt",
            "Co-Rider Wt",
            "Photos",
            "Issues",
            "Date"
          ]
        ],
        body: ctx.records.map((r, i) => [
          i + 1,
          r.riderName,
          r.vehicleModelName,
          r.routeName,
          `${r.rangeStartKm} km`,
          `${r.rangeStopKm} km`,
          r.startSoc != null ? `${r.startSoc}%` : "—",
          r.stopSoc != null ? `${r.stopSoc}%` : "—",
          `${r.topSpeedKmh} km/h`,
          `${r.avgSpeedKmh} km/h`,
          formatTestingMode(r.testingMode),
          formatTestPurpose(r.testPurpose),
          r.riderWeight != null ? `${r.riderWeight} kg` : "—",
          r.coRiderWeight != null ? `${r.coRiderWeight} kg` : "—",
          r.photoUrls.length > 0 ? `${r.photoUrls.length}` : "0",
          r.issues.map((is) => `[${is.flag}] ${is.description}`).join("; ") || "None",
          new Date(getRideDate(r)).toLocaleDateString()
        ]),
        styles: { fontSize: 6.5, cellPadding: 1.5, textColor: [220, 230, 228] },
        headStyles: {
          fillColor: [0, 80, 95],
          textColor: [200, 230, 225],
          fontStyle: "bold",
          fontSize: 7
        },
        alternateRowStyles: { fillColor: [18, 32, 38] },
        bodyStyles: { fillColor: [12, 22, 28] },
        tableLineColor: [30, 50, 60],
        tableLineWidth: 0.2,
        columnStyles: {
          0: { cellWidth: 5 },
          6: { cellWidth: 14 },
          7: { cellWidth: 14 },
          10: { cellWidth: 16 },
          11: { cellWidth: 18 },
          14: { cellWidth: 10 }
        }
      });
      const chartY = ((_a = doc.lastAutoTable) == null ? void 0 : _a.finalY) ?? curY + 60;
      if (ctx.speedChartImg && chartY + 60 < pageH - 20) {
        doc.setFontSize(9);
        doc.setTextColor(0, 200, 170);
        doc.text("Speed Trends — Top vs Avg Speed", 14, chartY + 8);
        doc.addImage(ctx.speedChartImg, "PNG", 14, chartY + 10, 85, 45);
      }
      if (ctx.rangeChartImg && chartY + 60 < pageH - 20) {
        doc.setFontSize(9);
        doc.setTextColor(0, 200, 170);
        doc.text("Range & SOC per Session", 110, chartY + 8);
        doc.addImage(ctx.rangeChartImg, "PNG", 110, chartY + 10, 85, 45);
      }
      if (ctx.issueChartImg && chartY + 60 < pageH - 20) {
        doc.setFontSize(9);
        doc.setTextColor(0, 200, 170);
        doc.text("Issue Frequency by Type", 206, chartY + 8);
        doc.addImage(ctx.issueChartImg, "PNG", 206, chartY + 10, 75, 45);
      }
      const pageCount = doc.getNumberOfPages();
      for (let pg = 1; pg <= pageCount; pg++) {
        doc.setPage(pg);
        doc.setFillColor(10, 25, 35);
        doc.rect(0, pageH - 12, pageW, 12, "F");
        doc.setFontSize(7.5);
        doc.setTextColor(80, 110, 105);
        doc.text(
          `OPG Mobility — Confidential EV Test Report   |   Page ${pg} of ${pageCount}   |   ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
          pageW / 2,
          pageH - 4.5,
          { align: "center" }
        );
      }
      doc.save(
        `OPG-Mobility-Report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`
      );
      ue.success("PDF report exported successfully");
    }
  );
}
function exportToExcel(ctx) {
  __vitePreload(() => import("./xlsx-sHbfT3iK.js"), true ? [] : void 0).then((XLSX) => {
    const wsData = [
      ["OPG Mobility — EV Test Records Report"],
      [`Generated by: ${ctx.userName}`],
      [`Generated at: ${(/* @__PURE__ */ new Date()).toLocaleString()}`],
      [`Filters: ${buildFilterSummary(ctx)}`],
      [`Total Records: ${ctx.records.length}`],
      [],
      [
        "#",
        "Rider Name",
        "Vehicle Model",
        "Route",
        "Range Start (km)",
        "Range Stop (km)",
        "Range (km)",
        "Start SOC%",
        "Stop SOC%",
        "Top Speed (km/h)",
        "Avg Speed (km/h)",
        "Testing Mode",
        "Test Purpose",
        "Rider Weight (kg)",
        "Co-rider Weight (kg)",
        "Photos Count",
        "Issue Count",
        "Issues Detail",
        "Date"
      ],
      ...ctx.records.map((r, i) => [
        i + 1,
        r.riderName,
        r.vehicleModelName,
        r.routeName,
        r.rangeStartKm,
        r.rangeStopKm,
        Number.parseFloat((r.rangeStopKm - r.rangeStartKm).toFixed(2)),
        r.startSoc ?? "—",
        r.stopSoc ?? "—",
        r.topSpeedKmh,
        r.avgSpeedKmh,
        formatTestingMode(r.testingMode),
        formatTestPurpose(r.testPurpose),
        r.riderWeight ?? "—",
        r.coRiderWeight ?? "—",
        r.photoUrls.length,
        r.issues.length,
        r.issues.map((is) => `[${is.flag}] ${is.description}`).join("; ") || "None",
        new Date(getRideDate(r)).toLocaleDateString()
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const a1 = ws.A1;
    if (a1) {
      a1.v = "OPG Mobility — EV Test Records Report";
      a1.t = "s";
    }
    ws["!cols"] = [
      { wch: 4 },
      { wch: 18 },
      { wch: 20 },
      { wch: 22 },
      { wch: 16 },
      { wch: 16 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 20 },
      { wch: 18 },
      { wch: 20 },
      { wch: 13 },
      { wch: 12 },
      { wch: 50 },
      { wch: 14 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Records");
    const issueCounts = {};
    for (const r of ctx.records) {
      for (const issue of r.issues) {
        issueCounts[issue.flag] = (issueCounts[issue.flag] ?? 0) + 1;
      }
    }
    const avgStartSoc = ctx.records.length > 0 ? (ctx.records.reduce((s, r) => s + (r.startSoc ?? 0), 0) / ctx.records.length).toFixed(1) : "—";
    const avgStopSoc = ctx.records.length > 0 ? (ctx.records.reduce((s, r) => s + (r.stopSoc ?? 0), 0) / ctx.records.length).toFixed(1) : "—";
    const summaryData = [
      ["OPG Mobility — Summary"],
      [],
      ["Metric", "Value"],
      ["Total Test Records", ctx.records.length],
      ["Avg Start SOC %", avgStartSoc],
      ["Avg Stop SOC %", avgStopSoc],
      [
        "Avg Range (km)",
        ctx.records.length > 0 ? (ctx.records.reduce(
          (s, r) => s + (r.rangeStopKm - r.rangeStartKm),
          0
        ) / ctx.records.length).toFixed(1) : 0
      ],
      [
        "Avg Top Speed (km/h)",
        ctx.records.length > 0 ? (ctx.records.reduce((s, r) => s + r.topSpeedKmh, 0) / ctx.records.length).toFixed(1) : 0
      ],
      [
        "Total Issues Logged",
        ctx.records.reduce((s, r) => s + r.issues.length, 0)
      ],
      [
        "Total Photos Uploaded",
        ctx.records.reduce((s, r) => s + r.photoUrls.length, 0)
      ],
      [],
      ["Issue Type", "Count"],
      ...Object.entries(issueCounts).map(([flag, cnt]) => [flag, cnt ?? 0])
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary["!cols"] = [{ wch: 28 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    XLSX.writeFile(
      wb,
      `OPG-Mobility-Report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`
    );
    ue.success("Excel report exported with full data and summary sheet");
  });
}
function AdminReports() {
  const { data: records = [], isLoading } = useTestRecords();
  const deleteRecord = useDeleteTestRecord();
  const { profile } = useAuth();
  const [filterVehicle, setFilterVehicle] = reactExports.useState("all");
  const [filterRoute, setFilterRoute] = reactExports.useState("all");
  const [filterRider, setFilterRider] = reactExports.useState("");
  const [filterDateFrom, setFilterDateFrom] = reactExports.useState("");
  const [filterDateTo, setFilterDateTo] = reactExports.useState("");
  const speedChartRef = reactExports.useRef(null);
  const rangeChartRef = reactExports.useRef(null);
  const issueChartRef = reactExports.useRef(null);
  const vehicles = reactExports.useMemo(
    () => Array.from(new Set(records.map((r) => r.vehicleModelName))),
    [records]
  );
  const routes = reactExports.useMemo(
    () => Array.from(new Set(records.map((r) => r.routeName))),
    [records]
  );
  const filtered = reactExports.useMemo(() => {
    return records.filter((r) => {
      if (filterVehicle !== "all" && r.vehicleModelName !== filterVehicle)
        return false;
      if (filterRoute !== "all" && r.routeName !== filterRoute) return false;
      if (filterRider.trim() && !r.riderName.toLowerCase().includes(filterRider.toLowerCase()))
        return false;
      const ts = getRideDate(r);
      if (filterDateFrom && ts < new Date(filterDateFrom).getTime())
        return false;
      if (filterDateTo && ts > new Date(filterDateTo).getTime() + 864e5)
        return false;
      return true;
    });
  }, [
    records,
    filterVehicle,
    filterRoute,
    filterRider,
    filterDateFrom,
    filterDateTo
  ]);
  const speedData = buildSpeedData(filtered);
  const rangeSocData = buildRangeSocData(filtered);
  const issueFreqData = buildIssueFreqData(filtered);
  const clearFilters = () => {
    setFilterVehicle("all");
    setFilterRoute("all");
    setFilterRider("");
    setFilterDateFrom("");
    setFilterDateTo("");
  };
  const getChartImage = async (ref) => {
    if (!ref.current) return void 0;
    try {
      const { default: html2canvas } = await __vitePreload(async () => {
        const { default: html2canvas2 } = await import("./html2canvas.esm-Dtsxr8dG.js");
        return { default: html2canvas2 };
      }, true ? [] : void 0);
      const canvas = await html2canvas(ref.current, {
        backgroundColor: "#ffffff",
        scale: 1.5
      });
      return canvas.toDataURL("image/png");
    } catch {
      return void 0;
    }
  };
  const handleExportPdf = async () => {
    const [speedImg, rangeImg, issueImg] = await Promise.allSettled([
      getChartImage(speedChartRef),
      getChartImage(rangeChartRef),
      getChartImage(issueChartRef)
    ]);
    exportToPdf({
      records: filtered,
      userName: (profile == null ? void 0 : profile.name) ?? "Admin",
      filters: {
        vehicle: filterVehicle,
        route: filterRoute,
        rider: filterRider,
        dateFrom: filterDateFrom,
        dateTo: filterDateTo
      },
      speedChartImg: speedImg.status === "fulfilled" ? speedImg.value : void 0,
      rangeChartImg: rangeImg.status === "fulfilled" ? rangeImg.value : void 0,
      issueChartImg: issueImg.status === "fulfilled" ? issueImg.value : void 0
    });
  };
  const handleExportExcel = () => {
    exportToExcel({
      records: filtered,
      userName: (profile == null ? void 0 : profile.name) ?? "Admin",
      filters: {
        vehicle: filterVehicle,
        route: filterRoute,
        rider: filterRider,
        dateFrom: filterDateFrom,
        dateTo: filterDateTo
      }
    });
  };
  const handleDelete = async (record) => {
    if (!confirm(
      `Delete test record by "${record.riderName}"? This cannot be undone.`
    ))
      return;
    try {
      await deleteRecord.mutateAsync(record.id);
      ue.success("Record deleted");
    } catch {
      ue.error("Failed to delete record");
    }
  };
  const hasActiveFilters = filterVehicle !== "all" || filterRoute !== "all" || filterRider.trim() || filterDateFrom || filterDateTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Filter, analyse, and export EV test session records" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportPdf,
            disabled: filtered.length === 0,
            className: "gap-2",
            "data-ocid": "export-pdf-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
              " Export PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportExcel,
            disabled: filtered.length === 0,
            className: "gap-2",
            "data-ocid": "export-excel-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 16 }),
              " Export Excel"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      { label: "Total Records", value: records.length },
      { label: "Vehicles Tested", value: vehicles.length },
      {
        label: "Total Issues",
        value: records.reduce((s, r) => s + r.issues.length, 0)
      },
      { label: "Showing (filtered)", value: filtered.length }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: s.value })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 15, className: "text-primary" }),
        " Filter Records",
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearFilters,
            className: "ml-auto text-xs text-muted-foreground hover:text-destructive transition-smooth",
            children: "Clear all"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Vehicle Model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterVehicle, onValueChange: setFilterVehicle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "bg-input border-border h-9 text-sm",
                "data-ocid": "filter-vehicle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All vehicles" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Vehicles" }),
              vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Route" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterRoute, onValueChange: setFilterRoute, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "bg-input border-border h-9 text-sm",
                "data-ocid": "filter-route",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All routes" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Routes" }),
              routes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Rider Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: filterRider,
              onChange: (e) => setFilterRider(e.target.value),
              placeholder: "Search rider...",
              className: "bg-input border-border h-9 text-sm",
              "data-ocid": "filter-rider"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Date From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateFrom,
              onChange: (e) => setFilterDateFrom(e.target.value),
              className: "bg-input border-border h-9 text-sm",
              "data-ocid": "filter-date-from"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Date To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateTo,
              onChange: (e) => setFilterDateTo(e.target.value),
              className: "bg-input border-border h-9 text-sm",
              "data-ocid": "filter-date-to"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-sm", children: "Speed Trends (km/h)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: speedChartRef, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : speedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-center justify-center text-muted-foreground text-sm", children: "No data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: speedData, children: [
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
              tick: { fontSize: 10, fill: CHART_TICK }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 10, fill: CHART_TICK },
              unit: " km/h",
              width: 50
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: CHART_TOOLTIP,
              labelStyle: { color: "oklch(0.145 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "topSpeed",
              stroke: "oklch(0.55 0.19 22)",
              strokeWidth: 2,
              dot: false,
              name: "Top Speed"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "avgSpeed",
              stroke: "oklch(0.45 0.15 230)",
              strokeWidth: 2,
              dot: false,
              name: "Avg Speed"
            }
          )
        ] }) }) }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-sm", children: "Range & SOC per Session" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: rangeChartRef, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : rangeSocData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-center justify-center text-muted-foreground text-sm", children: "No data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: rangeSocData, children: [
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
              tick: { fontSize: 10, fill: CHART_TICK }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 10, fill: CHART_TICK },
              width: 40
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: CHART_TOOLTIP,
              labelStyle: { color: "oklch(0.145 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "range",
              fill: "oklch(0.45 0.15 230)",
              radius: [3, 3, 0, 0],
              name: "Range (km)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "startSoc",
              fill: "oklch(0.60 0.18 200)",
              radius: [3, 3, 0, 0],
              name: "Start SOC%"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "stopSoc",
              fill: "oklch(0.72 0.18 110)",
              radius: [3, 3, 0, 0],
              name: "Stop SOC%"
            }
          )
        ] }) }) }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-sm", children: "Issue Frequency by Type" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: issueChartRef, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : issueFreqData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-center justify-center text-muted-foreground text-sm", children: "No issues logged" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: issueFreqData, layout: "vertical", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: CHART_GRID,
              horizontal: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              type: "number",
              tick: { fontSize: 10, fill: CHART_TICK }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              type: "category",
              dataKey: "flag",
              tick: { fontSize: 9, fill: CHART_TICK },
              width: 72
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: CHART_TOOLTIP,
              labelStyle: { color: "oklch(0.145 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", name: "Count", radius: [0, 3, 3, 0], children: issueFreqData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: ISSUE_COLORS[entry.flag] ?? "oklch(0.45 0 0)"
            },
            entry.flag
          )) })
        ] }) }) }) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-primary" }),
        " Test Records",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto text-xs", children: [
          filtered.length,
          " records"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 rounded" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "reports-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 36, className: "text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No records found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasActiveFilters ? "Try clearing the filters" : "Add test records via Data Entry" }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: clearFilters,
                className: "mt-3",
                children: "Clear Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Rider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Route" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Start SOC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Stop SOC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Top Spd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Avg Spd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Purpose" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-right", children: "Rider Wt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground text-center", children: "Photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Issues" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-8" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "border-border hover:bg-muted/30",
            "data-ocid": `report-row-${record.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: record.riderName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-[120px] truncate", children: record.vehicleModelName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-[100px] truncate", children: record.routeName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-sm font-mono text-muted-foreground whitespace-nowrap", children: [
                record.rangeStartKm,
                "→",
                record.rangeStopKm
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm font-medium", children: formatSoc(record.startSoc) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm font-medium", children: formatSoc(record.stopSoc) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: record.topSpeedKmh }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: record.avgSpeedKmh }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: formatTestingMode(record.testingMode) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap max-w-[100px] truncate", children: formatTestPurpose(record.testPurpose) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm text-muted-foreground", children: record.riderWeight != null ? `${record.riderWeight} kg` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: record.photoUrls.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 11 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: record.photoUrls.length })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: record.issues.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: record.issues.length })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(getRideDate(record)).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                  onClick: () => handleDelete(record),
                  "data-ocid": `delete-record-${record.id}`,
                  "aria-label": "Delete record",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                }
              ) })
            ]
          },
          record.id.toString()
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminReports as default
};
