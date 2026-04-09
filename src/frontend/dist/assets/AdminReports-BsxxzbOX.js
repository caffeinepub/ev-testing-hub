const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-Bsh7nyP7.js","assets/index-LhnIGNVd.js","assets/index-Cog_-PLq.css"])))=>i.map(i=>d[i]);
import { g as useTestRecords, G as useDeleteTestRecord, u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, H as FileText, L as Label, I as Input, S as Skeleton, e as Eye, x as ue, F as IssueFlag, n as reactDomExports, X, _ as __vitePreload } from "./index-LhnIGNVd.js";
import { B as Badge } from "./badge-C6aQCMFb.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-BcTxOoEl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D-RGOwUB.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-B6Wvfssr.js";
import { P as PhotoGallery } from "./PhotoGallery-DFVBPCT5.js";
import { F as FileSpreadsheet, D as Download } from "./file-spreadsheet-BdZwafFN.js";
import { F as Funnel } from "./funnel-Bu56et5N.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Legend, a as Line, B as Bar, c as Cell } from "./LineChart-D6ls80Hk.js";
import { B as BarChart } from "./BarChart-BMINAfks.js";
import { C as Camera } from "./camera-CzXtr-kA.js";
import { T as Trash2 } from "./trash-2-CyJKbKRs.js";
import { T as TriangleAlert } from "./triangle-alert-BOooZED3.js";
import { C as CircleCheck } from "./circle-check-DnX9_Tnv.js";
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
function issueFlagName(flag) {
  if (typeof flag === "string") return flag;
  if (flag && typeof flag === "object") {
    const keys = Object.keys(flag);
    if (keys.length > 0) return keys[0];
  }
  return String(flag);
}
function formatIssueCell(issues) {
  if (issues.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" });
  const first = issues[0];
  const flag = issueFlagName(first.flag);
  const desc = first.description ? `: ${first.description}` : "";
  const label = `[${flag}]${desc}`;
  const rest = issues.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-start gap-1 text-xs text-destructive", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "mt-0.5 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 break-all", children: label }),
      rest > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
        "+",
        rest,
        " more"
      ] })
    ] })
  ] });
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
        "data-ocid": "admin-record-detail-modal",
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
                  "data-ocid": "close-admin-record-detail",
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
async function fetchPhotoAsDataUrl(url) {
  try {
    if (url.startsWith("data:")) return url;
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
function exportToPdf(ctx) {
  Promise.all([__vitePreload(() => import("./jspdf.es.min-Bsh7nyP7.js").then((n) => n.j), true ? __vite__mapDeps([0,1,2]) : void 0), __vitePreload(() => import("./jspdf.plugin.autotable-DHcwasbS.js"), true ? [] : void 0)]).then(
    async ([{ default: jsPDF }, { default: autoTable }]) => {
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
      const recordsWithPhotos = ctx.records.filter(
        (r) => r.photoUrls && r.photoUrls.length > 0
      );
      if (recordsWithPhotos.length > 0) {
        doc.addPage();
        doc.setFillColor(10, 25, 35);
        doc.rect(0, 0, pageW, 18, "F");
        doc.setTextColor(0, 220, 180);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Session Photos", 14, 12);
        let photoY = 24;
        const photoW = 55;
        const photoH = 38;
        const photoCols = Math.floor((pageW - 28) / (photoW + 6));
        let photoCol = 0;
        for (let ri = 0; ri < recordsWithPhotos.length; ri++) {
          const rec = recordsWithPhotos[ri];
          const recIdx = ctx.records.indexOf(rec) + 1;
          const dateStr = new Date(getRideDate(rec)).toLocaleDateString();
          const heading = `Record #${recIdx} — ${rec.vehicleModelName}  ${dateStr}`;
          if (photoCol !== 0) {
            photoY += photoH + 14;
            photoCol = 0;
          }
          if (photoY + 6 > pageH - 20) {
            doc.addPage();
            photoY = 14;
          }
          doc.setFontSize(7.5);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(0, 200, 170);
          doc.text(heading, 14, photoY);
          photoY += 5;
          doc.setFont("helvetica", "normal");
          for (const photoUrl of rec.photoUrls) {
            if (photoY + photoH + 4 > pageH - 20) {
              doc.addPage();
              photoY = 14;
              photoCol = 0;
            }
            const x = 14 + photoCol * (photoW + 6);
            try {
              const dataUrl = await fetchPhotoAsDataUrl(photoUrl);
              if (dataUrl) {
                const fmt = dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
                doc.addImage(dataUrl, fmt, x, photoY, photoW, photoH);
              } else {
                doc.setDrawColor(80, 100, 100);
                doc.setFillColor(20, 35, 42);
                doc.roundedRect(x, photoY, photoW, photoH, 2, 2, "FD");
                doc.setFontSize(6);
                doc.setTextColor(100, 140, 135);
                doc.text(
                  "Photo unavailable",
                  x + photoW / 2,
                  photoY + photoH / 2,
                  {
                    align: "center"
                  }
                );
              }
            } catch {
            }
            photoCol++;
            if (photoCol >= photoCols) {
              photoCol = 0;
              photoY += photoH + 6;
            }
          }
          if (photoCol > 0) {
            photoY += photoH + 10;
            photoCol = 0;
          } else {
            photoY += 4;
          }
        }
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
    const photoRows = [
      ["Record#", "VehicleName", "DateOfRide", "PhotoURL"]
    ];
    ctx.records.forEach((r, i) => {
      const dateStr = new Date(getRideDate(r)).toLocaleDateString();
      for (const url of r.photoUrls) {
        photoRows.push([i + 1, r.vehicleModelName, dateStr, url]);
      }
    });
    const wsPhotos = XLSX.utils.aoa_to_sheet(photoRows);
    wsPhotos["!cols"] = [{ wch: 10 }, { wch: 22 }, { wch: 14 }, { wch: 80 }];
    XLSX.utils.book_append_sheet(wb, wsPhotos, "Photos");
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
  const [detailRecord, setDetailRecord] = reactExports.useState(null);
  const [expandedRecord, setExpandedRecord] = reactExports.useState(null);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: rangeChartRef, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : rangeSocData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-center justify-center text-muted-foreground text-sm", children: "No data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: rangeSocData, children: [
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
              stroke: "oklch(0.72 0.18 110)",
              strokeWidth: 2,
              dot: false,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20 text-xs text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((record) => {
          const recId = record.id.toString();
          const isExpanded = expandedRecord === recId;
          const hasPhotos = record.photoUrls && record.photoUrls.length > 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: hasPhotos ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExpandedRecord(isExpanded ? null : recId),
                      className: "inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-smooth bg-primary/8 hover:bg-primary/15 px-2 py-1 rounded-md",
                      "aria-label": "Toggle photos",
                      "data-ocid": `toggle-photos-${recId}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 11 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: record.photoUrls.length })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[180px]", children: formatIssueCell(record.issues) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(getRideDate(record)).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                    )
                  ] }) })
                ]
              }
            ),
            isExpanded && hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableRow,
              {
                className: "border-border bg-muted/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 15, className: "py-3 px-4", children: [
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
      ] }) }) })
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
  AdminReports as default
};
