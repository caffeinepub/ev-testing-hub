import { Badge } from "@/components/ui/badge";
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
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { IssueFlag } from "../backend";
import {
  useRoutes,
  useTestRecords,
  useVehicleModels,
} from "../hooks/useBackend";
import type { TestRecord } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ISSUE_BADGE: Record<string, string> = {
  [IssueFlag.Safety]: "text-red-600 border-red-300 bg-red-50",
  [IssueFlag.Electrical]: "text-cyan-700 border-cyan-300 bg-cyan-50",
  [IssueFlag.Mechanical]: "text-amber-700 border-amber-300 bg-amber-50",
  [IssueFlag.Software]: "text-violet-700 border-violet-300 bg-violet-50",
  [IssueFlag.Performance]: "text-lime-700 border-lime-300 bg-lime-50",
  [IssueFlag.Other]: "text-orange-700 border-orange-300 bg-orange-50",
};

function getRideDateMs(record: {
  dateOfRide?: bigint;
  timestamp: bigint;
}): number {
  if (record.dateOfRide != null) {
    return Number(record.dateOfRide) / 1_000_000;
  }
  return Number(record.timestamp) / 1_000_000;
}

function tsToDate(record: { dateOfRide?: bigint; timestamp: bigint }): string {
  return new Date(getRideDateMs(record)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function tsToISO(record: { dateOfRide?: bigint; timestamp: bigint }): string {
  return new Date(getRideDateMs(record)).toISOString().slice(0, 10);
}

function socColor(soc?: number): string {
  if (soc == null) return "#94a3b8";
  if (soc >= 60) return "#65a30d";
  if (soc >= 30) return "#d97706";
  return "#dc2626";
}

function rangeColor(km: number): string {
  if (km >= 50) return "#65a30d";
  if (km >= 25) return "#d97706";
  return "#dc2626";
}

function formatSoc(val?: number): string {
  return val != null ? `${val}%` : "—";
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Filters {
  dateFrom: string;
  dateTo: string;
  modelId: string;
  routeId: string;
  rider: string;
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

function FilterPanel({
  filters,
  modelOptions,
  routeOptions,
  onChange,
  totalShown,
  totalAll,
}: {
  filters: Filters;
  modelOptions: Array<{ id: string; name: string }>;
  routeOptions: Array<{ id: string; name: string }>;
  onChange: (f: Filters) => void;
  totalShown: number;
  totalAll: number;
}) {
  function set(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <Card className="border-border bg-card" data-ocid="analyst-filter-panel">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span>Filter Records</span>
          <span className="text-xs font-normal text-muted-foreground">
            Showing {totalShown} of {totalAll}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Date From</Label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => set("dateFrom", e.target.value)}
              className="bg-background border-input text-foreground text-sm h-10"
              data-ocid="filter-date-from"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Date To</Label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => set("dateTo", e.target.value)}
              className="bg-background border-input text-foreground text-sm h-10"
              data-ocid="filter-date-to"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Vehicle Model
            </Label>
            <Select
              value={filters.modelId}
              onValueChange={(v) => set("modelId", v)}
            >
              <SelectTrigger
                className="bg-background border-input text-sm h-10"
                data-ocid="filter-model"
              >
                <SelectValue placeholder="All models" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All models</SelectItem>
                {modelOptions.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Route</Label>
            <Select
              value={filters.routeId}
              onValueChange={(v) => set("routeId", v)}
            >
              <SelectTrigger
                className="bg-background border-input text-sm h-10"
                data-ocid="filter-route"
              >
                <SelectValue placeholder="All routes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All routes</SelectItem>
                {routeOptions.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Rider Name</Label>
            <Input
              type="text"
              placeholder="Search rider…"
              value={filters.rider}
              onChange={(e) => set("rider", e.target.value)}
              className="bg-background border-input text-foreground text-sm h-10"
              data-ocid="filter-rider"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────

function RecordRow({ record, index }: { record: TestRecord; index: number }) {
  const rangeAchieved = Math.max(0, record.rangeStopKm - record.rangeStartKm);

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
      className="border-b border-border hover:bg-muted/20 transition-colors"
      data-ocid={`record-row-${record.id}`}
    >
      <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
        {tsToDate(record)}
      </td>
      <td className="px-3 py-2.5 text-sm font-medium text-foreground whitespace-nowrap">
        {record.vehicleModelName}
      </td>
      <td className="px-3 py-2.5 text-sm text-muted-foreground whitespace-nowrap">
        {record.routeName}
      </td>
      <td className="px-3 py-2.5 text-sm text-foreground whitespace-nowrap">
        {record.riderName}
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground">
        {record.rangeStartKm}
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground">
        {record.rangeStopKm}
      </td>
      <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap">
        <span
          className="text-sm font-semibold"
          style={{ color: rangeColor(rangeAchieved) }}
        >
          {rangeAchieved} km
        </span>
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap">
        <span style={{ color: socColor(record.startSoc) }}>
          {formatSoc(record.startSoc)}
        </span>
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap">
        <span style={{ color: socColor(record.stopSoc) }}>
          {formatSoc(record.stopSoc)}
        </span>
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-foreground">
        {record.topSpeedKmh} km/h
      </td>
      <td className="px-3 py-2.5 text-sm text-right tabular-nums whitespace-nowrap text-muted-foreground">
        {record.avgSpeedKmh} km/h
      </td>
      <td className="px-3 py-2.5">
        <div className="flex flex-wrap gap-1 min-w-[100px]">
          {record.issues.length === 0 ? (
            <span className="text-xs text-muted-foreground">—</span>
          ) : (
            record.issues.map((issue, i) => (
              <Badge
                key={`${issue.flag}-${i}`}
                variant="outline"
                className={`text-[10px] px-1.5 py-0 ${ISSUE_BADGE[issue.flag] ?? ""}`}
                title={issue.description}
              >
                {issue.flag}
              </Badge>
            ))
          )}
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <tr>
      <td colSpan={12} className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
          data-ocid="analyst-reports-empty"
        >
          <span className="text-5xl">{filtered ? "🔍" : "📋"}</span>
          <p className="text-foreground font-semibold">
            {filtered ? "No matching records" : "No test records yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            {filtered
              ? "Try adjusting your filter criteria"
              : "Records will appear here once riders submit tests"}
          </p>
        </motion.div>
      </td>
    </tr>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AnalystReports() {
  const { data: records = [], isLoading: loadingRecords } = useTestRecords();
  const { data: models = [], isLoading: loadingModels } = useVehicleModels();
  const { data: routes = [], isLoading: loadingRoutes } = useRoutes();

  const isLoading = loadingRecords || loadingModels || loadingRoutes;

  const [filters, setFilters] = useState<Filters>({
    dateFrom: "",
    dateTo: "",
    modelId: "all",
    routeId: "all",
    rider: "",
  });

  const modelOptions = useMemo(
    () => models.map((m) => ({ id: m.id.toString(), name: m.name })),
    [models],
  );
  const routeOptions = useMemo(
    () => routes.map((r) => ({ id: r.id.toString(), name: r.name })),
    [routes],
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const dateStr = tsToISO(r);
      if (filters.dateFrom && dateStr < filters.dateFrom) return false;
      if (filters.dateTo && dateStr > filters.dateTo) return false;
      if (
        filters.modelId !== "all" &&
        r.vehicleModelId.toString() !== filters.modelId
      )
        return false;
      if (filters.routeId !== "all" && r.routeId.toString() !== filters.routeId)
        return false;
      if (
        filters.rider &&
        !r.riderName.toLowerCase().includes(filters.rider.toLowerCase())
      )
        return false;
      return true;
    });
  }, [records, filters]);

  const hasActiveFilter =
    filters.dateFrom !== "" ||
    filters.dateTo !== "" ||
    filters.modelId !== "all" ||
    filters.routeId !== "all" ||
    filters.rider !== "";

  if (isLoading) {
    return (
      <div className="p-6 space-y-6" data-ocid="analyst-reports-loading">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6" data-ocid="analyst-reports">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Test Reports
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View-only — all recorded EV test parameters
        </p>
      </motion.div>

      {/* Filters */}
      <FilterPanel
        filters={filters}
        modelOptions={modelOptions}
        routeOptions={routeOptions}
        onChange={setFilters}
        totalShown={filtered.length}
        totalAll={records.length}
      />

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card
          className="border-border bg-card overflow-hidden"
          data-ocid="analyst-reports-table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 sticky top-0">
                  {[
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
                    { label: "Issues", align: "left" },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${h.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <EmptyState filtered={hasActiveFilter} />
                ) : (
                  filtered.map((r, i) => (
                    <RecordRow key={r.id.toString()} record={r} index={i} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}{" "}
                displayed
              </span>
              <span className="text-xs text-muted-foreground">
                View only — no export for Analyst role
              </span>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
