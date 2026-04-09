import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IssueFlag } from "../backend";
import {
  useRoutes,
  useTestRecords,
  useVehicleModels,
} from "../hooks/useBackend";
import type { TestRecord } from "../types";

// ─── Palette ──────────────────────────────────────────────────────────────────
const BLUE = "oklch(0.45 0.15 230)";
const TEAL = "oklch(0.60 0.18 200)";
const AMBER = "#d97706";
const ROSE = "#dc2626";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const LIME = "#65a30d";

const ISSUE_COLORS: Record<string, string> = {
  [IssueFlag.Safety]: ROSE,
  [IssueFlag.Electrical]: TEAL,
  [IssueFlag.Mechanical]: AMBER,
  [IssueFlag.Software]: VIOLET,
  [IssueFlag.Performance]: LIME,
  [IssueFlag.Other]: ORANGE,
};

const CHART_GRID = "oklch(0.88 0 0)";
const CHART_TICK = "oklch(0.45 0 0)";

const TOOLTIP_STYLE = {
  backgroundColor: "oklch(1 0 0)",
  border: "1px solid oklch(0.88 0 0)",
  borderRadius: "8px",
  color: "oklch(0.145 0 0)",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function tsToDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function deriveChartData(records: TestRecord[]) {
  const recent = records.slice(-20);

  const rangeData = recent.map((r, i) => ({
    name: `#${i + 1}`,
    range: Math.max(0, r.rangeStopKm - r.rangeStartKm),
  }));

  const speedData = recent.map((r, i) => ({
    name: `#${i + 1}`,
    avgSpeed: r.avgSpeedKmh,
    topSpeed: r.topSpeedKmh,
  }));

  const socBuckets: Record<string, number> = {
    "0–20%": 0,
    "21–40%": 0,
    "41–60%": 0,
    "61–80%": 0,
    "81–100%": 0,
  };
  for (const r of records) {
    const soc = r.startSoc ?? 0;
    if (soc <= 20) socBuckets["0–20%"]++;
    else if (soc <= 40) socBuckets["21–40%"]++;
    else if (soc <= 60) socBuckets["41–60%"]++;
    else if (soc <= 80) socBuckets["61–80%"]++;
    else socBuckets["81–100%"]++;
  }
  const socData = Object.entries(socBuckets).map(([name, count]) => ({
    name,
    count,
  }));

  const issueCounts: Record<string, number> = {};
  for (const r of records) {
    for (const issue of r.issues) {
      issueCounts[issue.flag] = (issueCounts[issue.flag] ?? 0) + 1;
    }
  }
  const issueData = Object.entries(issueCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return { rangeData, speedData, socData, issueData };
}

function deriveTopIssues(records: TestRecord[]) {
  const counts: Record<
    string,
    { count: number; lastRecord: TestRecord; description: string }
  > = {};
  for (const r of records) {
    for (const issue of r.issues) {
      if (!counts[issue.flag]) {
        counts[issue.flag] = {
          count: 0,
          lastRecord: r,
          description: issue.description,
        };
      }
      counts[issue.flag].count++;
      counts[issue.flag].lastRecord = r;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([flag, data]) => ({ flag, ...data }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color,
  delay,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="border-border bg-card hover:border-primary/30 transition-smooth">
        <CardContent className="p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-3xl font-display font-bold" style={{ color }}>
            {value}
          </p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ChartCard({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

function TopIssuesPanel({ records }: { records: TestRecord[] }) {
  const topIssues = deriveTopIssues(records);

  if (topIssues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
        <span className="text-2xl">✅</span>
        <span>No issues recorded yet</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topIssues.map((issue, i) => (
        <motion.div
          key={issue.flag}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
        >
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: ISSUE_COLORS[issue.flag] ?? ORANGE }}
          >
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold truncate text-foreground">
                {issue.flag}
              </span>
              <Badge
                variant="outline"
                className="text-xs shrink-0"
                style={{
                  borderColor: ISSUE_COLORS[issue.flag],
                  color: ISSUE_COLORS[issue.flag],
                }}
              >
                {issue.count}×
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {issue.description || issue.lastRecord.vehicleModelName}
            </p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {tsToDate(issue.lastRecord.timestamp)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function RecentActivity({ records }: { records: TestRecord[] }) {
  const recent = records.slice(-6).reverse();
  if (recent.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-6">
        No records yet
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {recent.map((r) => (
        <div key={r.id.toString()} className="flex items-center gap-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
          <span className="flex-1 min-w-0 truncate">
            <span className="font-medium text-foreground">
              {r.vehicleModelName}
            </span>
            <span className="text-muted-foreground">
              {" "}
              — {r.riderName} — {r.routeName}
            </span>
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {tsToDate(r.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AnalystDashboard() {
  const { data: records = [], isLoading: loadingRecords } = useTestRecords();
  const { data: models = [], isLoading: loadingModels } = useVehicleModels();
  const { data: routes = [], isLoading: loadingRoutes } = useRoutes();

  const isLoading = loadingRecords || loadingModels || loadingRoutes;
  const uniqueRiders = new Set(records.map((r) => r.riderName)).size;
  const { rangeData, speedData, socData, issueData } = deriveChartData(records);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6" data-ocid="analyst-dashboard-loading">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((k) => (
            <Skeleton key={k} className="h-28 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((k) => (
            <Skeleton key={k} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6" data-ocid="analyst-dashboard">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Analyst Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          EV fleet test analytics — read-only view
        </p>
      </motion.div>

      {/* Summary stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="analyst-stats"
      >
        <StatCard
          label="Total Tests"
          value={records.length}
          sub="all time"
          color={BLUE}
          delay={0}
        />
        <StatCard
          label="Vehicle Models"
          value={models.length}
          sub="registered"
          color={TEAL}
          delay={0.05}
        />
        <StatCard
          label="Routes"
          value={routes.length}
          sub="configured"
          color={AMBER}
          delay={0.1}
        />
        <StatCard
          label="Unique Riders"
          value={uniqueRiders}
          sub="participated"
          color={VIOLET}
          delay={0.15}
        />
      </div>

      {/* Top 5 Issues + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card
            className="border-destructive/30 bg-red-50"
            data-ocid="top-issues-panel"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <span className="text-destructive">⚠</span>
                <span className="text-destructive">
                  Top 5 Issues / Problems
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TopIssuesPanel records={records} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card className="border-border bg-card" data-ocid="recent-activity">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-foreground">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity records={records} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Issue Frequency Bar */}
      <ChartCard title="Issue Type Frequency" delay={0.1}>
        {issueData.length === 0 ? (
          <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
            No issue data
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[340px]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={issueData}
                  margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: CHART_TICK, fontSize: 11 }}
                  />
                  <YAxis
                    tick={{ fill: CHART_TICK, fontSize: 11 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: "oklch(0.92 0 0 / 0.5)" }}
                  />
                  <Bar dataKey="value" name="Count" radius={[4, 4, 0, 0]}>
                    {issueData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={ISSUE_COLORS[entry.name] ?? ORANGE}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </ChartCard>

      {/* Range + Speed charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Range Achieved per Test (km)" delay={0.15}>
          {rangeData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
              No data yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[280px]">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={rangeData}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                    />
                    <YAxis
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                      unit=" km"
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Line
                      type="monotone"
                      dataKey="range"
                      name="Range (km)"
                      stroke={TEAL}
                      strokeWidth={2}
                      dot={{ fill: TEAL, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Speed Trend — Avg vs Top Speed (km/h)" delay={0.2}>
          {speedData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
              No data yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[280px]">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={speedData}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                    />
                    <YAxis
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                      unit=" km/h"
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend
                      wrapperStyle={{ fontSize: "11px", color: CHART_TICK }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgSpeed"
                      name="Avg Speed"
                      stroke={LIME}
                      strokeWidth={2}
                      dot={{ fill: LIME, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="topSpeed"
                      name="Top Speed"
                      stroke={BLUE}
                      strokeWidth={2}
                      strokeDasharray="5 3"
                      dot={{ fill: BLUE, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ChartCard>
      </div>

      {/* SOC Distribution + Issue Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="SOC % Distribution" delay={0.25}>
          {socData.every((d) => d.count === 0) ? (
            <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
              No data yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[280px]">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={socData}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                    />
                    <YAxis
                      tick={{ fill: CHART_TICK, fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      cursor={{ fill: "oklch(0.92 0 0 / 0.5)" }}
                    />
                    <Bar
                      dataKey="count"
                      name="Tests"
                      fill={BLUE}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Issue Category Breakdown" delay={0.3}>
          {issueData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
              No issues recorded
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[280px]">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={issueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {issueData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={ISSUE_COLORS[entry.name] ?? ORANGE}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend
                      wrapperStyle={{ fontSize: "11px", color: CHART_TICK }}
                      formatter={(value) => (
                        <span style={{ color: "oklch(0.145 0 0)" }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
