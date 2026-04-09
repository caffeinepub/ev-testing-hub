import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Battery,
  Calendar,
  Car,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  MapPin,
  Route,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TestRecord } from "../backend";
import { PhotoGallery } from "../components/PhotoGallery";
import {
  useRecordsByIssueFlag,
  useRoutes,
  useTestRecords,
  useTopIssues,
  useVehicleModels,
} from "../hooks/useBackend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compute top N issues from records client-side as a reliable fallback */
function computeTopIssues(
  records: TestRecord[],
  limit: number,
): Array<[string, bigint]> {
  const counts = new Map<string, bigint>();
  for (const r of records) {
    for (const issue of r.issues) {
      const key = issueFlagName(issue.flag);
      counts.set(key, (counts.get(key) ?? BigInt(0)) + BigInt(1));
    }
  }
  return [...counts.entries()]
    .sort((a, b) => (a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0))
    .slice(0, limit);
}

export function getRideDate(record: {
  dateOfRide?: bigint;
  timestamp: bigint;
}): number {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1_000_000;
  }
  return Number(record.timestamp) / 1_000_000;
}

const CHART_GRID = "oklch(0.88 0 0)";
const CHART_TICK = "oklch(0.45 0 0)";
const TOOLTIP_STYLE = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.88 0 0)",
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};
const TOOLTIP_LABEL = { color: "oklch(0.145 0 0)" };

const issueFlagColor: Record<string, string> = {
  Safety: "text-red-600 bg-red-50 border-red-200",
  Electrical: "text-amber-600 bg-amber-50 border-amber-200",
  Mechanical: "text-orange-600 bg-orange-50 border-orange-200",
  Software: "text-blue-600 bg-blue-50 border-blue-200",
  Performance: "text-primary bg-primary/8 border-primary/25",
  Other: "text-muted-foreground bg-muted border-border",
};

const issueFlagBg: Record<string, string> = {
  Safety: "bg-red-600",
  Electrical: "bg-amber-500",
  Mechanical: "bg-orange-500",
  Software: "bg-blue-600",
  Performance: "bg-primary",
  Other: "bg-muted-foreground",
};

const issueFlagHeaderBg: Record<string, string> = {
  Safety: "bg-red-50 border-red-200",
  Electrical: "bg-amber-50 border-amber-200",
  Mechanical: "bg-orange-50 border-orange-200",
  Software: "bg-blue-50 border-blue-200",
  Performance: "bg-primary/5 border-primary/20",
  Other: "bg-muted border-border",
};

const issueFlagTextColor: Record<string, string> = {
  Safety: "text-red-700",
  Electrical: "text-amber-700",
  Mechanical: "text-orange-700",
  Software: "text-blue-700",
  Performance: "text-primary",
  Other: "text-muted-foreground",
};

const issueFlagIcon: Record<string, string> = {
  Safety: "🔴",
  Electrical: "⚡",
  Mechanical: "🔧",
  Software: "💻",
  Performance: "📊",
  Other: "⚠️",
};

/** Extract the string key from an IssueFlag (enum string OR runtime object variant) */
export function issueFlagName(flag: unknown): string {
  if (typeof flag === "string") return flag;
  if (flag && typeof flag === "object") {
    const keys = Object.keys(flag as object);
    if (keys.length > 0) return keys[0];
  }
  return String(flag);
}

function formatTestingMode(mode?: {
  __kind__: string;
  Other?: string;
}): string {
  if (!mode) return "—";
  if (mode.__kind__ === "Other") return mode.Other || "Other";
  return mode.__kind__;
}

function formatTestPurpose(purpose?: {
  __kind__: string;
  Others?: string;
}): string {
  if (!purpose) return "—";
  if (purpose.__kind__ === "Others") return purpose.Others || "Others";
  if (purpose.__kind__ === "ComponentTest") return "Component Test";
  return purpose.__kind__;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

export function StatCard({
  title,
  value,
  sub,
  icon,
  accent,
}: {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Card
      className={`border-border bg-card ${accent ? "border-destructive/30" : ""}`}
    >
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {title}
            </p>
            <p className="text-3xl font-display font-bold text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent ? "bg-destructive/8 text-destructive" : "bg-primary/8 text-primary"}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── RecordDetailModal (inline, for drill-down use) ───────────────────────────

function RecordDetailModal({
  record,
  onClose,
}: {
  record: TestRecord;
  onClose: () => void;
}) {
  const date = new Date(getRideDate(record));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
    {
      label: "Testing Mode",
      value: formatTestingMode(
        record.testingMode as { __kind__: string; Other?: string } | undefined,
      ),
    },
    {
      label: "Rider Weight",
      value: record.riderWeight != null ? `${record.riderWeight} kg` : "—",
    },
    {
      label: "Co-rider Weight",
      value: record.coRiderWeight != null ? `${record.coRiderWeight} kg` : "—",
    },
    {
      label: "Test Purpose",
      value: formatTestPurpose(
        record.testPurpose as { __kind__: string; Others?: string } | undefined,
      ),
    },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
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
              <p className="text-sm text-muted-foreground">
                No issues reported
              </p>
            ) : (
              <div className="space-y-1.5">
                {record.issues.map((issue, i) => (
                  <div
                    key={`${issueFlagName(issue.flag)}-${i}`}
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

// ─── IssueDetailModal ─────────────────────────────────────────────────────────

function IssueDetailModal({
  flagKey,
  totalCount,
  onClose,
}: {
  flagKey: string;
  totalCount: bigint;
  onClose: () => void;
}) {
  const { data: records = [], isLoading } = useRecordsByIssueFlag(flagKey);
  const [expandedRecord, setExpandedRecord] = useState<TestRecord | null>(null);

  // Sort newest first
  const sorted = [...records].sort((a, b) => getRideDate(b) - getRideDate(a));

  // Summary stats
  const dates = sorted.map((r) => getRideDate(r));
  const firstDate = dates.length > 0 ? Math.min(...dates) : null;
  const latestDate = dates.length > 0 ? Math.max(...dates) : null;
  const uniqueRiders = new Set(sorted.map((r) => r.riderName)).size;
  const uniqueVehicles = new Set(sorted.map((r) => r.vehicleModelName)).size;

  const headerColor = issueFlagHeaderBg[flagKey] ?? "bg-muted border-border";
  const textColor = issueFlagTextColor[flagKey] ?? "text-muted-foreground";
  const dotColor = issueFlagBg[flagKey] ?? "bg-muted-foreground";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
      data-ocid="issue-detail-modal"
    >
      <div
        className="fixed inset-0 bg-black/55"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close issue detail"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-background border border-border shadow-2xl my-4">
        {/* Header */}
        <div className={`rounded-t-2xl border-b px-5 py-5 ${headerColor}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dotColor} text-white text-xl`}
              >
                {issueFlagIcon[flagKey] ?? "⚠️"}
              </div>
              <div className="min-w-0">
                <h2
                  className={`text-xl font-display font-bold ${textColor} leading-tight`}
                >
                  {flagKey} Issues — Drill-Down
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Detailed breakdown of all reported {flagKey.toLowerCase()}{" "}
                  issues
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 rounded-lg hover:bg-black/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Big count badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-4xl font-display font-bold ${textColor}`}>
              {totalCount.toString()}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              total occurrences across {sorted.length} test session
              {sorted.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Summary cards */}
        {!isLoading && sorted.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4 border-b border-border bg-muted/30">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Calendar size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  First Seen
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {firstDate
                  ? new Date(firstDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Calendar size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Latest
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {latestDate
                  ? new Date(latestDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Users size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Riders
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {uniqueRiders}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Car size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Vehicles
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {uniqueVehicles}
              </p>
            </div>
          </div>
        )}

        {/* Records list */}
        <div className="max-h-[55vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-5 space-y-3">
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-20 rounded-lg" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Zap size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No records found for this issue
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sorted.map((record, idx) => {
                // Find only issues matching this flag
                const matchingIssues = record.issues.filter(
                  (iss) => issueFlagName(iss.flag) === flagKey,
                );
                const rideDate = new Date(getRideDate(record));

                return (
                  <div
                    key={record.id.toString()}
                    className="px-5 py-4 hover:bg-muted/25 transition-colors"
                    data-ocid={`issue-record-row-${idx}`}
                  >
                    {/* Row header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {record.riderName}
                            <span className="text-muted-foreground font-normal ml-1.5">
                              ·
                            </span>
                            <span className="text-muted-foreground font-normal ml-1.5">
                              {record.vehicleModelName}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {rideDate.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                            <span className="mx-1.5">·</span>
                            {record.routeName}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedRecord(record)}
                        className="shrink-0 flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors px-2 py-1 rounded-md hover:bg-primary/8"
                        data-ocid={`issue-record-detail-${idx}`}
                        title="View full record"
                      >
                        <ExternalLink size={12} />
                        <span className="hidden sm:inline">Full Details</span>
                      </button>
                    </div>

                    {/* Matching issue descriptions */}
                    <div className="space-y-1.5 mb-3">
                      {matchingIssues.map((iss) => (
                        <div
                          key={iss.description ?? issueFlagName(iss.flag)}
                          className={`flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${issueFlagColor[flagKey] ?? "text-muted-foreground bg-muted border-border"}`}
                        >
                          <AlertTriangle
                            size={11}
                            className="mt-0.5 shrink-0"
                          />
                          <span className="break-words">
                            {iss.description || `${flagKey} issue reported`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Key data pills */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        <Route size={10} />
                        {(record.rangeStopKm - record.rangeStartKm).toFixed(1)}{" "}
                        km
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        <TrendingUp size={10} />↑{record.topSpeedKmh} / ~
                        {record.avgSpeedKmh} km/h
                      </span>
                      {record.testingMode && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                          {formatTestingMode(
                            record.testingMode as {
                              __kind__: string;
                              Other?: string;
                            },
                          )}{" "}
                          mode
                        </span>
                      )}
                      {record.testPurpose && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                          {formatTestPurpose(
                            record.testPurpose as {
                              __kind__: string;
                              Others?: string;
                            },
                          )}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        {record.issues.length} issue
                        {record.issues.length !== 1 ? "s" : ""} total
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20 rounded-b-2xl">
          <p className="text-xs text-muted-foreground">
            Showing {sorted.length} session{sorted.length !== 1 ? "s" : ""} ·
            sorted newest first
          </p>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Record detail modal (nested) */}
      {expandedRecord && (
        <RecordDetailModal
          record={expandedRecord}
          onClose={() => setExpandedRecord(null)}
        />
      )}
    </div>,
    document.body,
  );
}

// ─── Chart helpers ────────────────────────────────────────────────────────────

function buildSpeedData(records: TestRecord[]) {
  return records.slice(-10).map((r, i) => ({
    label: `T${i + 1}`,
    avg: r.avgSpeedKmh,
    top: r.topSpeedKmh,
  }));
}

function buildRangeSocData(records: TestRecord[]) {
  return records.slice(-8).map((r, i) => ({
    label: `T${i + 1}`,
    range: r.rangeStopKm - r.rangeStartKm,
    startSoc: r.startSoc ?? 0,
    stopSoc: r.stopSoc ?? 0,
  }));
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { data: records = [], isLoading: recordsLoading } = useTestRecords();
  const { data: topIssuesRaw = [], isLoading: issuesLoading } = useTopIssues(5);
  const { data: models = [], isLoading: modelsLoading } = useVehicleModels();
  const { data: routes = [], isLoading: routesLoading } = useRoutes();

  const [selectedIssue, setSelectedIssue] = useState<{
    flagKey: string;
    count: bigint;
  } | null>(null);

  // Use backend top issues; fall back to client-side computation if backend returns empty
  const topIssues: Array<[string, bigint]> =
    topIssuesRaw.length > 0
      ? topIssuesRaw.map(([flag, count]) => [issueFlagName(flag), count])
      : computeTopIssues(records, 5);

  // Daily Run KM — sum of (stopKm - startKm) for records whose ride date is today
  const todayStart = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  })();
  const todayEnd = todayStart + 86_400_000;

  const dailyRunKm = records.reduce((sum, r) => {
    const rideMs = getRideDate(r);
    if (rideMs >= todayStart && rideMs < todayEnd) {
      return sum + Math.max(0, r.rangeStopKm - r.rangeStartKm);
    }
    return sum;
  }, 0);

  const overallTotalKm = records.reduce(
    (sum, r) => sum + Math.max(0, r.rangeStopKm - r.rangeStartKm),
    0,
  );

  const totalRecords = records.length;
  const avgSoc =
    records.length > 0
      ? (() => {
          const withBoth = records.filter(
            (r) => r.startSoc != null && r.stopSoc != null,
          );
          if (withBoth.length === 0) return 0;
          return Math.round(
            withBoth.reduce(
              (s, r) => s + ((r.startSoc ?? 0) - (r.stopSoc ?? 0)),
              0,
            ) / withBoth.length,
          );
        })()
      : 0;
  const avgRange =
    records.length > 0
      ? Math.round(
          records.reduce((s, r) => s + (r.rangeStopKm - r.rangeStartKm), 0) /
            records.length,
        )
      : 0;
  const totalIssues = records.reduce((s, r) => s + r.issues.length, 0);
  const recentRecords = records.slice(-5).reverse();

  const speedData = buildSpeedData(records);
  const rangeSocData = buildRangeSocData(records);

  const isStatsLoading = recordsLoading || modelsLoading || routesLoading;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            OPG Mobility EV Test Fleet Overview
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1.5 min-h-[40px]"
            data-ocid="quick-action-entry"
          >
            <Link to="/admin/entry">
              <ClipboardList size={14} /> New Entry
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1.5 min-h-[40px]"
            data-ocid="quick-action-models"
          >
            <Link to="/admin/models">
              <Car size={14} /> Models
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1.5 min-h-[40px]"
            data-ocid="quick-action-routes"
          >
            <Link to="/admin/routes">
              <MapPin size={14} /> Routes
            </Link>
          </Button>
        </div>
      </div>

      {/* KM highlight cards — Daily Run & Overall Total */}
      <div className="grid grid-cols-2 gap-4">
        {isStatsLoading ? (
          ["a", "b"].map((k) => (
            <Skeleton key={k} className="h-28 rounded-lg" />
          ))
        ) : (
          <>
            <Card
              className="border-2 border-primary/30 bg-primary/5"
              data-ocid="stat-daily-km"
            >
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-primary/70 uppercase tracking-wider font-semibold mb-1">
                      Daily Run KM
                    </p>
                    <p className="text-3xl font-display font-bold text-primary">
                      {dailyRunKm.toFixed(1)}
                      <span className="text-lg font-medium ml-1">km</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total KM driven today
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Route size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="border-2 border-primary/20 bg-primary/3"
              data-ocid="stat-overall-km"
            >
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-primary/70 uppercase tracking-wider font-semibold mb-1">
                      Overall Total KM
                    </p>
                    <p className="text-3xl font-display font-bold text-foreground">
                      {overallTotalKm.toFixed(1)}
                      <span className="text-lg font-medium ml-1 text-muted-foreground">
                        km
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cumulative across all records
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isStatsLoading ? (
          ["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-28 rounded-lg" />
          ))
        ) : (
          <>
            <StatCard
              title="Total Tests"
              value={totalRecords}
              sub="All sessions"
              icon={<Activity size={20} />}
            />
            <StatCard
              title="Vehicle Models"
              value={models.length}
              sub="Registered EVs"
              icon={<Car size={20} />}
            />
            <StatCard
              title="Test Routes"
              value={routes.length}
              sub="Active routes"
              icon={<MapPin size={20} />}
            />
            <StatCard
              title="Total Issues"
              value={totalIssues}
              sub="Flagged problems"
              icon={<AlertTriangle size={20} />}
              accent={totalIssues > 0}
            />
          </>
        )}
      </div>

      {/* Avg stats row */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Avg Used SOC %"
          value={`${avgSoc}%`}
          sub="Avg SOC consumed per test"
          icon={<Battery size={20} />}
        />
        <StatCard
          title="Avg Range"
          value={`${avgRange} km`}
          sub="Per test session"
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* TOP 5 CRITICAL ISSUES */}
      <Card
        className="border-2 border-destructive/35 bg-red-50"
        data-ocid="admin-top-issues"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle size={18} className="text-destructive" />
            </div>
            <div>
              <CardTitle className="font-display text-base tracking-wide text-destructive">
                ⚠ TOP 5 CRITICAL ISSUES / PROBLEMS
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click any issue to see full drill-down with all records, dates,
                and riders
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {issuesLoading && recordsLoading ? (
            <div className="space-y-3">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-12 rounded-md" />
              ))}
            </div>
          ) : topIssues.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-8 text-center"
              data-ocid="top-issues-empty"
            >
              <Zap size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No issues reported yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Issues appear here as test records are added
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {topIssues.map(([flagKey, count], idx) => {
                return (
                  <button
                    key={flagKey}
                    type="button"
                    onClick={() => setSelectedIssue({ flagKey, count })}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-left ${idx === 0 ? "border-destructive/30 bg-red-100/60 hover:bg-red-100" : "border-border bg-card hover:bg-muted/40"}`}
                    data-ocid={`issue-row-${idx}`}
                    aria-label={`View details for ${flagKey} issues`}
                  >
                    <span className="text-base font-bold text-destructive w-5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-base shrink-0">
                      {issueFlagIcon[flagKey] ?? "⚠️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {flagKey} Issue
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {flagKey}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium shrink-0 ${issueFlagColor[flagKey] ?? "text-muted-foreground bg-muted border-border"}`}
                    >
                      {flagKey}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0 border-destructive/30 text-destructive"
                    >
                      {count.toString()} × reported
                    </Badge>
                    <ChevronRight
                      size={16}
                      className="text-muted-foreground shrink-0"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue drill-down modal */}
      {selectedIssue && (
        <IssueDetailModal
          flagKey={selectedIssue.flagKey}
          totalCount={selectedIssue.count}
          onClose={() => setSelectedIssue(null)}
        />
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Speed Trends — Top vs Avg (km/h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recordsLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : speedData.length === 0 ? (
              <div className="flex h-52 items-center justify-center text-muted-foreground text-sm">
                No data yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[280px]">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={speedData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={CHART_GRID}
                      />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: CHART_TICK }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: CHART_TICK }}
                        unit=" km/h"
                      />
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        labelStyle={TOOLTIP_LABEL}
                      />
                      <Line
                        type="monotone"
                        dataKey="avg"
                        stroke="oklch(0.45 0.15 230)"
                        strokeWidth={2}
                        dot={false}
                        name="Avg Speed"
                      />
                      <Line
                        type="monotone"
                        dataKey="top"
                        stroke="oklch(0.55 0.19 22)"
                        strokeWidth={2}
                        dot={false}
                        name="Top Speed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Range vs SOC — per Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recordsLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : rangeSocData.length === 0 ? (
              <div className="flex h-52 items-center justify-center text-muted-foreground text-sm">
                No data yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[280px]">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={rangeSocData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={CHART_GRID}
                      />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: CHART_TICK }}
                      />
                      <YAxis tick={{ fontSize: 11, fill: CHART_TICK }} />
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        labelStyle={TOOLTIP_LABEL}
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
                        stroke="oklch(0.55 0.16 160)"
                        strokeWidth={2}
                        dot={false}
                        name="Stop SOC%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Records */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base flex items-center gap-2">
              <ClipboardList size={18} className="text-primary" /> Recent Test
              Records
            </CardTitle>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              data-ocid="view-all-reports-btn"
            >
              <Link to="/admin/reports">View All →</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recordsLoading ? (
            <div className="p-6 space-y-3">
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-10 rounded" />
              ))}
            </div>
          ) : recentRecords.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-12 text-center"
              data-ocid="recent-records-empty"
            >
              <ClipboardList size={32} className="text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">No test records yet</p>
              <Button asChild className="mt-3 gap-2" size="sm">
                <Link to="/admin/entry">
                  <ClipboardList size={14} /> Add First Record
                </Link>
              </Button>
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
                      Start SOC
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Stop SOC
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Speeds
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Issues
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRecords.map((r) => (
                    <TableRow
                      key={r.id.toString()}
                      className="border-border hover:bg-muted/30"
                      data-ocid={`recent-row-${r.id}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {r.riderName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.vehicleModelName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.routeName}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {r.startSoc != null ? `${r.startSoc}%` : "—"}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {r.stopSoc != null ? `${r.stopSoc}%` : "—"}
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        ↑{r.topSpeedKmh} / ~{r.avgSpeedKmh}
                      </TableCell>
                      <TableCell>
                        {r.issues.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-destructive">
                            <AlertTriangle size={11} />
                            {r.issues.length}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(getRideDate(r)).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
