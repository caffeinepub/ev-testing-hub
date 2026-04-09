import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  BarChart3,
  Camera,
  CheckCircle2,
  Eye,
  Filter,
  Search,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { TestPurpose, TestRecord, TestingMode } from "../backend";
import { PhotoGallery } from "../components/PhotoGallery";
import { useAuth } from "../hooks/useAuth";
import { useTestRecords, useVehicleModels } from "../hooks/useBackend";

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

/** Full record detail modal — rendered via portal to document.body */
function RecordDetailModal({
  record,
  onClose,
}: {
  record: TestRecord;
  onClose: () => void;
}) {
  const date = new Date(getRideDate(record));

  // Close on Escape
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
      data-ocid="record-detail-modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close details"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-border shadow-xl">
        {/* Header */}
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
            data-ocid="close-record-detail"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Key fields grid */}
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

          {/* Notes */}
          {(record as TestRecord & { notes?: string }).notes && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">
                Notes / Remarks
              </p>
              <p className="text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2 break-words">
                {(record as TestRecord & { notes?: string }).notes}
              </p>
            </div>
          )}

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

export default function RiderRecords() {
  const { profile } = useAuth();
  const { data: allRecords = [], isLoading } = useTestRecords();
  const { data: models = [] } = useVehicleModels();

  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState("all");
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [detailRecord, setDetailRecord] = useState<TestRecord | null>(null);

  const records = useMemo(
    () => allRecords.filter((r) => r.riderName === profile?.name),
    [allRecords, profile],
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        !search ||
        r.vehicleModelName.toLowerCase().includes(search.toLowerCase()) ||
        r.routeName.toLowerCase().includes(search.toLowerCase());
      const matchesModel =
        modelFilter === "all" || r.vehicleModelId.toString() === modelFilter;
      return matchesSearch && matchesModel;
    });
  }, [records, search, modelFilter]);

  const totalRange = records.reduce(
    (s, r) => s + (r.rangeStopKm - r.rangeStartKm),
    0,
  );
  const avgSoc =
    records.length > 0
      ? Math.round(
          records.reduce((s, r) => s + (r.startSoc ?? 0), 0) / records.length,
        )
      : 0;
  const avgTopSpeed =
    records.length > 0
      ? (
          records.reduce((s, r) => s + r.topSpeedKmh, 0) / records.length
        ).toFixed(1)
      : "0";
  const totalIssues = records.reduce((s, r) => s + r.issues.length, 0);

  const statsCards = [
    {
      label: "Sessions",
      value: records.length,
      icon: BarChart3,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Range",
      value: `${totalRange.toFixed(1)} km`,
      icon: TrendingUp,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      label: "Avg SOC%",
      value: `${avgSoc}%`,
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Issues Logged",
      value: totalIssues,
      icon: AlertTriangle,
      color: totalIssues > 0 ? "text-destructive" : "text-chart-4",
      bg: totalIssues > 0 ? "bg-destructive/10" : "bg-chart-4/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          My Records
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your personal test session history — {records.length} session
          {records.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isLoading
          ? ["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-20 rounded-xl" />
            ))
          : statsCards.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="bg-card border-border">
                  <CardContent className="pt-4 pb-3 px-4 flex items-start gap-3">
                    <div className={`${s.bg} p-2 rounded-lg shrink-0`}>
                      <Icon size={15} className={s.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground leading-none mb-1">
                        {s.label}
                      </p>
                      <p className="text-xl font-display font-bold text-foreground truncate">
                        {s.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <BarChart3 size={17} className="text-primary" />
            Test Sessions
            {filtered.length !== records.length && (
              <Badge variant="outline" className="ml-auto text-xs font-mono">
                {filtered.length} / {records.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicle or route..."
                className="pl-8 bg-input border-border"
                data-ocid="rider-records-search"
              />
            </div>
            <Select value={modelFilter} onValueChange={setModelFilter}>
              <SelectTrigger
                className="bg-input border-border w-full sm:w-48"
                data-ocid="rider-records-model-filter"
              >
                <Filter size={13} className="mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="All Models" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {models.map((m) => (
                  <SelectItem key={m.id.toString()} value={m.id.toString()}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(search || modelFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setModelFilter("all");
                }}
                className="text-muted-foreground"
                data-ocid="rider-records-clear-filter"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="space-y-2">
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="rider-records-empty"
            >
              <BarChart3
                size={40}
                className="text-muted-foreground mb-3 opacity-40"
              />
              <p className="font-semibold text-foreground">
                {records.length === 0
                  ? "No sessions recorded yet"
                  : "No sessions match your filters"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {records.length === 0
                  ? "Submit your first test session from the Enter Data page"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">
                      Vehicle
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">
                      Route
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                      Range (km)
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                      Start SOC
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                      Stop SOC
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                      Top Speed
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                      Avg Speed
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">
                      Issues
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((record) => {
                    const rangeKm = (
                      record.rangeStopKm - record.rangeStartKm
                    ).toFixed(1);
                    const date = new Date(getRideDate(record));
                    const recId = record.id.toString();
                    const isExpanded = expandedRecord === recId;
                    const hasPhotos =
                      record.photoUrls && record.photoUrls.length > 0;
                    return (
                      <Fragment key={recId}>
                        <TableRow
                          className="border-border hover:bg-muted/20 transition-smooth"
                          data-ocid={`rider-record-${record.id}`}
                        >
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            <div className="font-medium text-foreground text-sm">
                              {date.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {date.getFullYear()}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-sm text-foreground">
                            {record.vehicleModelName}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {record.routeName}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-sm font-mono text-foreground">
                              {record.rangeStartKm}→{record.rangeStopKm}
                            </span>
                            <div className="text-xs text-muted-foreground text-right">
                              {rangeKm} km
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Zap size={11} className="text-accent" />
                              <span className="text-sm font-semibold text-accent">
                                {record.startSoc != null
                                  ? `${record.startSoc}%`
                                  : "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Zap size={11} className="text-accent" />
                              <span className="text-sm font-semibold text-accent">
                                {record.stopSoc != null
                                  ? `${record.stopSoc}%`
                                  : "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-sm font-mono text-foreground">
                            {record.topSpeedKmh} km/h
                          </TableCell>
                          <TableCell className="text-right text-sm font-mono text-muted-foreground">
                            {record.avgSpeedKmh} km/h
                          </TableCell>
                          <TableCell>
                            {record.issues.length > 0 ? (
                              <div className="flex items-center gap-1.5">
                                <AlertTriangle
                                  size={13}
                                  className="text-destructive"
                                />
                                <span className="text-sm font-semibold text-destructive">
                                  {record.issues.length}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CheckCircle2
                                  size={12}
                                  className="text-accent"
                                />
                                None
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {/* View details button */}
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
                              {/* Photos toggle */}
                              {hasPhotos && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedRecord(isExpanded ? null : recId)
                                  }
                                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth"
                                  aria-label="Toggle photos"
                                  data-ocid={`toggle-photos-${recId}`}
                                >
                                  <Camera size={11} />
                                  {record.photoUrls.length}
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                        {isExpanded && hasPhotos && (
                          <TableRow
                            key={`${recId}-photos`}
                            className="border-border bg-muted/10"
                          >
                            <TableCell colSpan={10} className="py-3 px-4">
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

      {/* Average stats highlight */}
      {records.length > 0 && (
        <div className="rounded-lg border border-border bg-card px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <TrendingUp size={15} className="text-primary" />
            Session Averages
          </div>
          <div className="flex gap-6 flex-wrap justify-center sm:justify-start">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg Top Speed</p>
              <p className="text-base font-display font-bold text-foreground">
                {avgTopSpeed} km/h
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg Start SOC</p>
              <p className="text-base font-display font-bold text-accent">
                {avgSoc}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg Range</p>
              <p className="text-base font-display font-bold text-foreground">
                {records.length > 0
                  ? (totalRange / records.length).toFixed(1)
                  : "0"}{" "}
                km
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Record detail modal */}
      {detailRecord && (
        <RecordDetailModal
          record={detailRecord}
          onClose={() => setDetailRecord(null)}
        />
      )}
    </div>
  );
}
