import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Trash2,
  X,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { IssueFlag } from "../backend";
import type { TestPurpose, TestRecord, TestingMode } from "../backend";
import { PhotoGallery } from "../components/PhotoGallery";
import { useAuth } from "../hooks/useAuth";
import { useDeleteTestRecord, useTestRecords } from "../hooks/useBackend";

// ─── Chart theme ─────────────────────────────────────────────────────────────
const CHART_GRID = "oklch(0.88 0 0)";
const CHART_TICK = "oklch(0.45 0 0)";
const CHART_TOOLTIP = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.88 0 0)",
  borderRadius: 8,
  fontSize: 11,
  color: "oklch(0.145 0 0)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSoc(val?: number): string {
  return val != null ? `${val}%` : "—";
}

function formatTestingMode(mode?: TestingMode): string {
  if (!mode) return "—";
  if (mode.__kind__ === "Other") return mode.Other || "Other";
  return mode.__kind__;
}

function formatTestPurpose(purpose?: TestPurpose): string {
  if (!purpose) return "—";
  if (purpose.__kind__ === "Others") return purpose.Others || "Others";
  if (purpose.__kind__ === "ComponentTest") return "Component Test";
  return purpose.__kind__;
}

function getRideDate(record: {
  dateOfRide?: bigint;
  timestamp: bigint;
}): number {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1_000_000;
  }
  return Number(record.timestamp) / 1_000_000;
}

function issueFlagName(flag: unknown): string {
  if (typeof flag === "string") return flag;
  if (flag && typeof flag === "object") {
    const keys = Object.keys(flag as object);
    if (keys.length > 0) return keys[0];
  }
  return String(flag);
}

/** Render first issue description truncated; show "+N more" if multiple */
function formatIssueCell(issues: TestRecord["issues"]): React.ReactNode {
  if (issues.length === 0)
    return <span className="text-xs text-muted-foreground">—</span>;
  const first = issues[0];
  const flag = issueFlagName(first.flag);
  const desc = first.description ? `: ${first.description}` : "";
  const label = `[${flag}]${desc}`;
  const rest = issues.length - 1;
  return (
    <span className="inline-flex items-start gap-1 text-xs text-destructive">
      <AlertTriangle size={11} className="mt-0.5 shrink-0" />
      <span className="min-w-0">
        <span className="line-clamp-1 break-all">{label}</span>
        {rest > 0 && (
          <span className="text-muted-foreground ml-1">+{rest} more</span>
        )}
      </span>
    </span>
  );
}

/** Full record detail modal — rendered via portal to document.body */
function RecordDetailModal({
  record,
  onClose,
}: {
  record: TestRecord;
  onClose: () => void;
}) {
  const date = new Date(getRideDate(record));

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const fields: { label: string; value: React.ReactNode }[] = [
    {
      label: "Date of Ride",
      value: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    },
    { label: "Rider", value: record.riderName },
    { label: "Vehicle Model", value: record.vehicleModelName },
    {
      label: "Route",
      value: record.customRoute
        ? `${record.routeName} (Custom: ${record.customRoute})`
        : record.routeName,
    },
    {
      label: "Range",
      value: `${record.rangeStartKm} km → ${record.rangeStopKm} km (${(record.rangeStopKm - record.rangeStartKm).toFixed(1)} km)`,
    },
    {
      label: "Start SOC",
      value: record.startSoc != null ? `${record.startSoc}%` : "—",
    },
    {
      label: "Stop SOC",
      value: record.stopSoc != null ? `${record.stopSoc}%` : "—",
    },
    { label: "Top Speed", value: `${record.topSpeedKmh} km/h` },
    { label: "Avg Speed", value: `${record.avgSpeedKmh} km/h` },
    { label: "Testing Mode", value: formatTestingMode(record.testingMode) },
    {
      label: "Rider Weight",
      value: record.riderWeight != null ? `${record.riderWeight} kg` : "—",
    },
    {
      label: "Co-rider Weight",
      value: record.coRiderWeight != null ? `${record.coRiderWeight} kg` : "—",
    },
    { label: "Test Purpose", value: formatTestPurpose(record.testPurpose) },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      data-ocid="admin-record-detail-modal"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close details"
      />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-border shadow-xl">
        <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-display font-bold text-foreground">
              Test Session Details
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {record.vehicleModelName} · {record.routeName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close details"
            data-ocid="close-admin-record-detail"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* Issues */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Issues ({record.issues.length})
            </p>
            {record.issues.length === 0 ? (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-green-600" />
                No issues reported
              </div>
            ) : (
              <div className="space-y-1.5">
                {record.issues.map((issue, i) => (
                  <div
                    key={`issue-${issueFlagName(issue.flag)}-${i}`}
                    className="flex items-start gap-2 rounded-lg bg-destructive/5 border border-destructive/15 px-3 py-2"
                  >
                    <AlertTriangle
                      size={13}
                      className="text-destructive mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-destructive">
                        {issueFlagName(issue.flag)}
                      </span>
                      {issue.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 break-words">
                          {issue.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          {record.photoUrls && record.photoUrls.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Photos ({record.photoUrls.length})
              </p>
              <PhotoGallery urls={record.photoUrls} maxVisible={8} />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Chart helpers ────────────────────────────────────────────────────────────

function buildSpeedData(records: TestRecord[]) {
  return records.slice(-12).map((r, i) => ({
    label: `T${i + 1}`,
    topSpeed: r.topSpeedKmh,
    avgSpeed: r.avgSpeedKmh,
    rider: r.riderName,
  }));
}

function buildRangeSocData(records: TestRecord[]) {
  return records.slice(-10).map((r, i) => ({
    label: `T${i + 1}`,
    range: Number.parseFloat((r.rangeStopKm - r.rangeStartKm).toFixed(1)),
    startSoc: r.startSoc ?? 0,
    stopSoc: r.stopSoc ?? 0,
  }));
}

function buildIssueFreqData(records: TestRecord[]) {
  const counts: Partial<Record<IssueFlag, number>> = {};
  for (const r of records) {
    for (const issue of r.issues) {
      counts[issue.flag] = (counts[issue.flag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([flag, count]) => ({ flag, count }))
    .sort((a, b) => b.count - a.count);
}

const ISSUE_COLORS: Record<string, string> = {
  [IssueFlag.Safety]: "oklch(0.55 0.24 25)",
  [IssueFlag.Electrical]: "oklch(0.75 0.18 90)",
  [IssueFlag.Mechanical]: "oklch(0.65 0.19 22)",
  [IssueFlag.Software]: "oklch(0.55 0.15 230)",
  [IssueFlag.Performance]: "oklch(0.72 0.18 110)",
  [IssueFlag.Other]: "oklch(0.6 0 0)",
};

// ─── Export utilities ─────────────────────────────────────────────────────────

interface ExportContext {
  records: TestRecord[];
  userName: string;
  filters: {
    vehicle: string;
    route: string;
    rider: string;
    dateFrom: string;
    dateTo: string;
  };
  speedChartImg?: string;
  rangeChartImg?: string;
  issueChartImg?: string;
}

function buildFilterSummary(ctx: ExportContext): string {
  const parts: string[] = [];
  if (ctx.filters.vehicle !== "all")
    parts.push(`Vehicle: ${ctx.filters.vehicle}`);
  if (ctx.filters.route !== "all") parts.push(`Route: ${ctx.filters.route}`);
  if (ctx.filters.rider.trim()) parts.push(`Rider: ${ctx.filters.rider}`);
  if (ctx.filters.dateFrom) parts.push(`From: ${ctx.filters.dateFrom}`);
  if (ctx.filters.dateTo) parts.push(`To: ${ctx.filters.dateTo}`);
  return parts.length > 0 ? parts.join("  |  ") : "No filters applied";
}

/** Fetch a URL (HTTP or data URI) and return a base64 PNG/JPEG data URI */
async function fetchPhotoAsDataUrl(url: string): Promise<string | null> {
  try {
    // Already a data URI
    if (url.startsWith("data:")) return url;
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function exportToPdf(ctx: ExportContext) {
  Promise.all([import("jspdf"), import("jspdf-autotable")]).then(
    async ([{ default: jsPDF }, { default: autoTable }]) => {
      const doc = new jsPDF({ orientation: "landscape", format: "a4" });
      const pageW = doc.internal.pageSize.width;
      const pageH = doc.internal.pageSize.height;

      // ── Header band ──
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
        `Generated by: ${ctx.userName}   |   Date: ${new Date().toLocaleString()}`,
        pageW - 14,
        13,
        { align: "right" },
      );
      doc.text(
        `Records: ${ctx.records.length}   |   ${buildFilterSummary(ctx)}`,
        pageW - 14,
        21,
        { align: "right" },
      );

      let curY = 38;

      // ── Filters summary ──
      doc.setTextColor(100, 120, 115);
      doc.setFontSize(8);
      doc.text(`Filters: ${buildFilterSummary(ctx)}`, 14, curY);
      curY += 8;

      // ── Data table ──
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
            "Date",
          ],
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
          r.issues.map((is) => `[${is.flag}] ${is.description}`).join("; ") ||
            "None",
          new Date(getRideDate(r)).toLocaleDateString(),
        ]),
        styles: { fontSize: 6.5, cellPadding: 1.5, textColor: [220, 230, 228] },
        headStyles: {
          fillColor: [0, 80, 95],
          textColor: [200, 230, 225],
          fontStyle: "bold",
          fontSize: 7,
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
          14: { cellWidth: 10 },
        },
      });

      // ── Charts ──
      const chartY =
        (doc as { lastAutoTable?: { finalY?: number } }).lastAutoTable
          ?.finalY ?? curY + 60;

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

      // ── Photos section ──
      const recordsWithPhotos = ctx.records.filter(
        (r) => r.photoUrls && r.photoUrls.length > 0,
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

          // Section heading for this record
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
                // Detect format
                const fmt = dataUrl.startsWith("data:image/png")
                  ? "PNG"
                  : "JPEG";
                doc.addImage(dataUrl, fmt, x, photoY, photoW, photoH);
              } else {
                // placeholder box on failure
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
                    align: "center",
                  },
                );
              }
            } catch {
              // skip failed photo silently
            }
            photoCol++;
            if (photoCol >= photoCols) {
              photoCol = 0;
              photoY += photoH + 6;
            }
          }
          // Advance past last row of photos for this record
          if (photoCol > 0) {
            photoY += photoH + 10;
            photoCol = 0;
          } else {
            photoY += 4;
          }
        }
      }

      // ── Footer on each page ──
      const pageCount = doc.getNumberOfPages();
      for (let pg = 1; pg <= pageCount; pg++) {
        doc.setPage(pg);
        doc.setFillColor(10, 25, 35);
        doc.rect(0, pageH - 12, pageW, 12, "F");
        doc.setFontSize(7.5);
        doc.setTextColor(80, 110, 105);
        doc.text(
          `OPG Mobility — Confidential EV Test Report   |   Page ${pg} of ${pageCount}   |   ${new Date().toLocaleDateString()}`,
          pageW / 2,
          pageH - 4.5,
          { align: "center" },
        );
      }

      doc.save(
        `OPG-Mobility-Report-${new Date().toISOString().slice(0, 10)}.pdf`,
      );
      toast.success("PDF report exported successfully");
    },
  );
}

function exportToExcel(ctx: ExportContext) {
  import("xlsx").then((XLSX) => {
    const wsData: (string | number)[][] = [
      ["OPG Mobility — EV Test Records Report"],
      [`Generated by: ${ctx.userName}`],
      [`Generated at: ${new Date().toLocaleString()}`],
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
        "Date",
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
        r.issues.map((is) => `[${is.flag}] ${is.description}`).join("; ") ||
          "None",
        new Date(getRideDate(r)).toLocaleDateString(),
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Style title cell
    const a1 = ws.A1 as { v?: string; t?: string } | undefined;
    if (a1) {
      a1.v = "OPG Mobility — EV Test Records Report";
      a1.t = "s";
    }

    // Set column widths
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
      { wch: 14 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Records");

    // Summary sheet
    const issueCounts: Partial<Record<string, number>> = {};
    for (const r of ctx.records) {
      for (const issue of r.issues) {
        issueCounts[issue.flag] = (issueCounts[issue.flag] ?? 0) + 1;
      }
    }
    const avgStartSoc =
      ctx.records.length > 0
        ? (
            ctx.records.reduce((s, r) => s + (r.startSoc ?? 0), 0) /
            ctx.records.length
          ).toFixed(1)
        : "—";
    const avgStopSoc =
      ctx.records.length > 0
        ? (
            ctx.records.reduce((s, r) => s + (r.stopSoc ?? 0), 0) /
            ctx.records.length
          ).toFixed(1)
        : "—";

    const summaryData: (string | number)[][] = [
      ["OPG Mobility — Summary"],
      [],
      ["Metric", "Value"],
      ["Total Test Records", ctx.records.length],
      ["Avg Start SOC %", avgStartSoc],
      ["Avg Stop SOC %", avgStopSoc],
      [
        "Avg Range (km)",
        ctx.records.length > 0
          ? (
              ctx.records.reduce(
                (s, r) => s + (r.rangeStopKm - r.rangeStartKm),
                0,
              ) / ctx.records.length
            ).toFixed(1)
          : 0,
      ],
      [
        "Avg Top Speed (km/h)",
        ctx.records.length > 0
          ? (
              ctx.records.reduce((s, r) => s + r.topSpeedKmh, 0) /
              ctx.records.length
            ).toFixed(1)
          : 0,
      ],
      [
        "Total Issues Logged",
        ctx.records.reduce((s, r) => s + r.issues.length, 0),
      ],
      [
        "Total Photos Uploaded",
        ctx.records.reduce((s, r) => s + r.photoUrls.length, 0),
      ],
      [],
      ["Issue Type", "Count"],
      ...Object.entries(issueCounts).map(([flag, cnt]) => [flag, cnt ?? 0]),
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary["!cols"] = [{ wch: 28 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    // Photos reference sheet
    const photoRows: (string | number)[][] = [
      ["Record#", "VehicleName", "DateOfRide", "PhotoURL"],
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
      `OPG-Mobility-Report-${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
    toast.success("Excel report exported with full data and summary sheet");
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminReports() {
  const { data: records = [], isLoading } = useTestRecords();
  const deleteRecord = useDeleteTestRecord();
  const { profile } = useAuth();

  const [filterVehicle, setFilterVehicle] = useState("all");
  const [filterRoute, setFilterRoute] = useState("all");
  const [filterRider, setFilterRider] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [detailRecord, setDetailRecord] = useState<TestRecord | null>(null);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const speedChartRef = useRef<HTMLDivElement>(null);
  const rangeChartRef = useRef<HTMLDivElement>(null);
  const issueChartRef = useRef<HTMLDivElement>(null);

  const vehicles = useMemo(
    () => Array.from(new Set(records.map((r) => r.vehicleModelName))),
    [records],
  );
  const routes = useMemo(
    () => Array.from(new Set(records.map((r) => r.routeName))),
    [records],
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (filterVehicle !== "all" && r.vehicleModelName !== filterVehicle)
        return false;
      if (filterRoute !== "all" && r.routeName !== filterRoute) return false;
      if (
        filterRider.trim() &&
        !r.riderName.toLowerCase().includes(filterRider.toLowerCase())
      )
        return false;
      const ts = getRideDate(r);
      if (filterDateFrom && ts < new Date(filterDateFrom).getTime())
        return false;
      if (filterDateTo && ts > new Date(filterDateTo).getTime() + 86400000)
        return false;
      return true;
    });
  }, [
    records,
    filterVehicle,
    filterRoute,
    filterRider,
    filterDateFrom,
    filterDateTo,
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

  const getChartImage = async (
    ref: React.RefObject<HTMLDivElement | null>,
  ): Promise<string | undefined> => {
    if (!ref.current) return undefined;
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(ref.current, {
        backgroundColor: "#ffffff",
        scale: 1.5,
      });
      return canvas.toDataURL("image/png");
    } catch {
      return undefined;
    }
  };

  const handleExportPdf = async () => {
    const [speedImg, rangeImg, issueImg] = await Promise.allSettled([
      getChartImage(speedChartRef),
      getChartImage(rangeChartRef),
      getChartImage(issueChartRef),
    ]);
    exportToPdf({
      records: filtered,
      userName: profile?.name ?? "Admin",
      filters: {
        vehicle: filterVehicle,
        route: filterRoute,
        rider: filterRider,
        dateFrom: filterDateFrom,
        dateTo: filterDateTo,
      },
      speedChartImg:
        speedImg.status === "fulfilled" ? speedImg.value : undefined,
      rangeChartImg:
        rangeImg.status === "fulfilled" ? rangeImg.value : undefined,
      issueChartImg:
        issueImg.status === "fulfilled" ? issueImg.value : undefined,
    });
  };

  const handleExportExcel = () => {
    exportToExcel({
      records: filtered,
      userName: profile?.name ?? "Admin",
      filters: {
        vehicle: filterVehicle,
        route: filterRoute,
        rider: filterRider,
        dateFrom: filterDateFrom,
        dateTo: filterDateTo,
      },
    });
  };

  const handleDelete = async (record: TestRecord) => {
    if (
      !confirm(
        `Delete test record by "${record.riderName}"? This cannot be undone.`,
      )
    )
      return;
    try {
      await deleteRecord.mutateAsync(record.id);
      toast.success("Record deleted");
    } catch {
      toast.error("Failed to delete record");
    }
  };

  const hasActiveFilters =
    filterVehicle !== "all" ||
    filterRoute !== "all" ||
    filterRider.trim() ||
    filterDateFrom ||
    filterDateTo;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Filter, analyse, and export EV test session records
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={handleExportPdf}
            disabled={filtered.length === 0}
            className="gap-2"
            data-ocid="export-pdf-btn"
          >
            <FileText size={16} /> Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleExportExcel}
            disabled={filtered.length === 0}
            className="gap-2"
            data-ocid="export-excel-btn"
          >
            <FileSpreadsheet size={16} /> Export Excel
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Records", value: records.length },
          { label: "Vehicles Tested", value: vehicles.length },
          {
            label: "Total Issues",
            value: records.reduce((s, r) => s + r.issues.length, 0),
          },
          { label: "Showing (filtered)", value: filtered.length },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm flex items-center gap-2">
            <Filter size={15} className="text-primary" /> Filter Records
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-smooth"
              >
                Clear all
              </button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Vehicle Model
              </Label>
              <Select value={filterVehicle} onValueChange={setFilterVehicle}>
                <SelectTrigger
                  className="bg-input border-border h-9 text-sm"
                  data-ocid="filter-vehicle"
                >
                  <SelectValue placeholder="All vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  {vehicles.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Route</Label>
              <Select value={filterRoute} onValueChange={setFilterRoute}>
                <SelectTrigger
                  className="bg-input border-border h-9 text-sm"
                  data-ocid="filter-route"
                >
                  <SelectValue placeholder="All routes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  {routes.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Rider Name
              </Label>
              <Input
                value={filterRider}
                onChange={(e) => setFilterRider(e.target.value)}
                placeholder="Search rider..."
                className="bg-input border-border h-9 text-sm"
                data-ocid="filter-rider"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Date From</Label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="bg-input border-border h-9 text-sm"
                data-ocid="filter-date-from"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Date To</Label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="bg-input border-border h-9 text-sm"
                data-ocid="filter-date-to"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-sm">
              Speed Trends (km/h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={speedChartRef}>
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : speedData.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-muted-foreground text-sm">
                  No data
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[280px]">
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={speedData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={CHART_GRID}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: CHART_TICK }}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: CHART_TICK }}
                          unit=" km/h"
                          width={50}
                        />
                        <Tooltip
                          contentStyle={CHART_TOOLTIP}
                          labelStyle={{ color: "oklch(0.145 0 0)" }}
                        />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Line
                          type="monotone"
                          dataKey="topSpeed"
                          stroke="oklch(0.55 0.19 22)"
                          strokeWidth={2}
                          dot={false}
                          name="Top Speed"
                        />
                        <Line
                          type="monotone"
                          dataKey="avgSpeed"
                          stroke="oklch(0.45 0.15 230)"
                          strokeWidth={2}
                          dot={false}
                          name="Avg Speed"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-sm">
              Range & SOC per Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={rangeChartRef}>
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : rangeSocData.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-muted-foreground text-sm">
                  No data
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[280px]">
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={rangeSocData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={CHART_GRID}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: CHART_TICK }}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: CHART_TICK }}
                          width={40}
                        />
                        <Tooltip
                          contentStyle={CHART_TOOLTIP}
                          labelStyle={{ color: "oklch(0.145 0 0)" }}
                        />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Line
                          type="monotone"
                          dataKey="range"
                          stroke="oklch(0.45 0.15 230)"
                          strokeWidth={2}
                          dot={false}
                          name="Range (km)"
                        />
                        <Line
                          type="monotone"
                          dataKey="startSoc"
                          stroke="oklch(0.60 0.18 200)"
                          strokeWidth={2}
                          dot={false}
                          name="Start SOC%"
                        />
                        <Line
                          type="monotone"
                          dataKey="stopSoc"
                          stroke="oklch(0.72 0.18 110)"
                          strokeWidth={2}
                          dot={false}
                          name="Stop SOC%"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-sm">
              Issue Frequency by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={issueChartRef}>
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : issueFreqData.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-muted-foreground text-sm">
                  No issues logged
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[280px]">
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={issueFreqData} layout="vertical">
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={CHART_GRID}
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 10, fill: CHART_TICK }}
                        />
                        <YAxis
                          type="category"
                          dataKey="flag"
                          tick={{ fontSize: 9, fill: CHART_TICK }}
                          width={72}
                        />
                        <Tooltip
                          contentStyle={CHART_TOOLTIP}
                          labelStyle={{ color: "oklch(0.145 0 0)" }}
                        />
                        <Bar dataKey="count" name="Count" radius={[0, 3, 3, 0]}>
                          {issueFreqData.map((entry) => (
                            <Cell
                              key={entry.flag}
                              fill={
                                ISSUE_COLORS[entry.flag] ?? "oklch(0.45 0 0)"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Records Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Test Records
            <Badge variant="outline" className="ml-auto text-xs">
              {filtered.length} records
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-11 rounded" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="reports-empty-state"
            >
              <Download size={36} className="text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">No records found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {hasActiveFilters
                  ? "Try clearing the filters"
                  : "Add test records via Data Entry"}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-3"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs text-muted-foreground">
                      Rider
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Vehicle
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Route
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Range
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Start SOC
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Stop SOC
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Top Spd
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Avg Spd
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Mode
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Purpose
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Rider Wt
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-center">
                      Photos
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Issues
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="w-20 text-xs text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((record) => {
                    const recId = record.id.toString();
                    const isExpanded = expandedRecord === recId;
                    const hasPhotos =
                      record.photoUrls && record.photoUrls.length > 0;
                    return (
                      <Fragment key={recId}>
                        <TableRow
                          className="border-border hover:bg-muted/30"
                          data-ocid={`report-row-${record.id}`}
                        >
                          <TableCell className="font-medium text-sm">
                            {record.riderName}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate">
                            {record.vehicleModelName}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[100px] truncate">
                            {record.routeName}
                          </TableCell>
                          <TableCell className="text-right text-sm font-mono text-muted-foreground whitespace-nowrap">
                            {record.rangeStartKm}→{record.rangeStopKm}
                          </TableCell>
                          <TableCell className="text-right text-sm font-medium">
                            {formatSoc(record.startSoc)}
                          </TableCell>
                          <TableCell className="text-right text-sm font-medium">
                            {formatSoc(record.stopSoc)}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {record.topSpeedKmh}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {record.avgSpeedKmh}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatTestingMode(record.testingMode)}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap max-w-[100px] truncate">
                            {formatTestPurpose(record.testPurpose)}
                          </TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">
                            {record.riderWeight != null
                              ? `${record.riderWeight} kg`
                              : "—"}
                          </TableCell>
                          {/* Bug 2 fix: clickable photo badge */}
                          <TableCell className="text-center">
                            {hasPhotos ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedRecord(isExpanded ? null : recId)
                                }
                                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-smooth bg-primary/8 hover:bg-primary/15 px-2 py-1 rounded-md"
                                aria-label="Toggle photos"
                                data-ocid={`toggle-photos-${recId}`}
                              >
                                <Camera size={11} />
                                <span>{record.photoUrls.length}</span>
                              </button>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                —
                              </span>
                            )}
                          </TableCell>
                          {/* Bug 3 fix: show issue text not count */}
                          <TableCell className="max-w-[180px]">
                            {formatIssueCell(record.issues)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(getRideDate(record)).toLocaleDateString()}
                          </TableCell>
                          {/* Bug 1 fix: Eye/Details button + Delete */}
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setDetailRecord(record)}
                                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-smooth bg-primary/8 hover:bg-primary/15 px-2 py-1 rounded-md"
                                aria-label="View full record details"
                                data-ocid={`view-details-${recId}`}
                              >
                                <Eye size={11} />
                                Details
                              </button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDelete(record)}
                                data-ocid={`delete-record-${record.id}`}
                                aria-label="Delete record"
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {/* Bug 2 fix: inline photo gallery row */}
                        {isExpanded && hasPhotos && (
                          <TableRow
                            key={`${recId}-photos`}
                            className="border-border bg-muted/10"
                          >
                            <TableCell colSpan={15} className="py-3 px-4">
                              <div className="flex items-center gap-2 mb-1">
                                <Camera
                                  size={13}
                                  className="text-muted-foreground"
                                />
                                <span className="text-xs text-muted-foreground font-medium">
                                  Session captures ({record.photoUrls.length})
                                </span>
                              </div>
                              <PhotoGallery urls={record.photoUrls} />
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bug 1 fix: record detail modal */}
      {detailRecord && (
        <RecordDetailModal
          record={detailRecord}
          onClose={() => setDetailRecord(null)}
        />
      )}
    </div>
  );
}
