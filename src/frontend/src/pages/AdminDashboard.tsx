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
  Car,
  ClipboardList,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IssueFlag } from "../backend";
import type { TestRecord } from "../backend";
import {
  useRoutes,
  useTestRecords,
  useTopIssues,
  useVehicleModels,
} from "../hooks/useBackend";

function getRideDate(record: {
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

const issueFlagColor: Record<IssueFlag, string> = {
  [IssueFlag.Safety]: "text-red-600 bg-red-50 border-red-200",
  [IssueFlag.Electrical]: "text-amber-600 bg-amber-50 border-amber-200",
  [IssueFlag.Mechanical]: "text-orange-600 bg-orange-50 border-orange-200",
  [IssueFlag.Software]: "text-blue-600 bg-blue-50 border-blue-200",
  [IssueFlag.Performance]: "text-primary bg-primary/8 border-primary/25",
  [IssueFlag.Other]: "text-muted-foreground bg-muted border-border",
};

const issueFlagIcon: Record<IssueFlag, string> = {
  [IssueFlag.Safety]: "🔴",
  [IssueFlag.Electrical]: "⚡",
  [IssueFlag.Mechanical]: "🔧",
  [IssueFlag.Software]: "💻",
  [IssueFlag.Performance]: "📊",
  [IssueFlag.Other]: "⚠️",
};

function StatCard({
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

export default function AdminDashboard() {
  const { data: records = [], isLoading: recordsLoading } = useTestRecords();
  const { data: topIssues = [], isLoading: issuesLoading } = useTopIssues(5);
  const { data: models = [], isLoading: modelsLoading } = useVehicleModels();
  const { data: routes = [], isLoading: routesLoading } = useRoutes();

  const totalRecords = records.length;
  const avgSoc =
    records.length > 0
      ? Math.round(
          records.reduce((s, r) => s + (r.startSoc ?? 0), 0) / records.length,
        )
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
          title="Avg Start SOC %"
          value={`${avgSoc}%`}
          sub="Across all tests"
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
                Most frequent issues across all test records
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {issuesLoading ? (
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
              {topIssues.map(([flag, count], idx) => (
                <div
                  key={flag}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-smooth hover:shadow-sm ${idx === 0 ? "border-destructive/30 bg-red-100/60" : "border-border bg-card"}`}
                  data-ocid={`issue-row-${idx}`}
                >
                  <span className="text-base font-bold text-destructive w-5 shrink-0">
                    #{idx + 1}
                  </span>
                  <span className="text-base shrink-0">
                    {issueFlagIcon[flag as IssueFlag] ?? "⚠️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {flag} Issue
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Category: {flag}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium shrink-0 ${issueFlagColor[flag as IssueFlag] ?? ""}`}
                  >
                    {flag}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs shrink-0 border-destructive/30 text-destructive"
                  >
                    {count.toString()} × reported
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                    <BarChart data={rangeSocData}>
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
                      <Bar
                        dataKey="range"
                        fill="oklch(0.45 0.15 230)"
                        radius={[4, 4, 0, 0]}
                        name="Range (km)"
                      />
                      <Bar
                        dataKey="startSoc"
                        fill="oklch(0.60 0.18 200)"
                        radius={[4, 4, 0, 0]}
                        name="Start SOC %"
                      />
                      <Bar
                        dataKey="stopSoc"
                        fill="oklch(0.55 0.16 160)"
                        radius={[4, 4, 0, 0]}
                        name="Stop SOC %"
                      />
                    </BarChart>
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
