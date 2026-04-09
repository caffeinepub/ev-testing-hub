import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import type { Issue, TestPurpose, TestingMode } from "../backend";
import { IssueFlag } from "../backend";
import {
  useAdminCreateTestRecord,
  useRoutes,
  useVehicleModels,
} from "../hooks/useBackend";
import type { Route, VehicleModel } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParsedRow {
  rowNum: number;
  valid: boolean;
  error?: string;
  data?: ImportRecord;
  raw: Record<string, string>;
}

interface ImportRecord {
  vehicleModelId: bigint;
  routeId: bigint;
  riderName: string;
  rangeStartKm: number;
  rangeStopKm: number;
  startSoc: number | null;
  stopSoc: number | null;
  topSpeedKmh: number;
  avgSpeedKmh: number;
  issues: Issue[];
  testingMode: TestingMode;
  customRoute: string | null;
  riderWeight: number | null;
  coRiderWeight: number | null;
  testPurpose: TestPurpose;
  dateOfRide?: number;
}

// ─── Excel column order ───────────────────────────────────────────────────────
const HEADERS = [
  "Date",
  "Vehicle Model Name",
  "Route Name",
  "Start KM",
  "Stop KM",
  "Start SOC (%)",
  "Stop SOC (%)",
  "Top Speed (km/h)",
  "Average Speed (km/h)",
  "Testing Mode",
  "Custom Mode (if Other)",
  "Custom Route (if Other mode)",
  "Rider Name",
  "Rider Weight (kg)",
  "Co-rider Weight (kg)",
  "Test Purpose",
  "Custom Test Purpose (if Others)",
  "Issues (semicolon-separated)",
];

// ─── Template download ────────────────────────────────────────────────────────
function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  const rows = [
    HEADERS,
    [
      "2026-04-08",
      "OPG E-Scooter X1",
      "City Loop Route",
      "12500",
      "12620",
      "95",
      "42",
      "65",
      "38",
      "Eco",
      "",
      "",
      "Rahul Sharma",
      "72",
      "",
      "Range",
      "",
      "Battery drain;Tyre wear",
    ],
    [
      "2026-04-08",
      "OPG E-Bike Pro",
      "Highway Stretch",
      "8300",
      "8445",
      "100",
      "55",
      "85",
      "62",
      "Sport",
      "",
      "",
      "Priya Mehta",
      "58",
      "54",
      "Durability",
      "",
      "Brake noise",
    ],
  ];
  const ws = XLSX.utils.aoa_to_sheet(rows);
  // Column widths
  ws["!cols"] = HEADERS.map((h) => ({ wch: Math.max(h.length + 4, 18) }));
  XLSX.utils.book_append_sheet(wb, ws, "EV Test Data");
  XLSX.writeFile(wb, "EV_Test_Import_Template.xlsx");
  toast.success("Template downloaded — fill it in and upload it here.");
}

// ─── Parsers ──────────────────────────────────────────────────────────────────
function parseTestingMode(val: string, customMode: string): TestingMode | null {
  const v = val.trim().toLowerCase();
  if (v === "eco") return { __kind__: "Eco", Eco: null };
  if (v === "city") return { __kind__: "City", City: null };
  if (v === "sport") return { __kind__: "Sport", Sport: null };
  if (v === "other") return { __kind__: "Other", Other: customMode.trim() };
  return null;
}

function parseTestPurpose(
  val: string,
  customPurpose: string,
): TestPurpose | null {
  const v = val.trim().toLowerCase();
  if (v === "range") return { __kind__: "Range", Range: null };
  if (v === "durability") return { __kind__: "Durability", Durability: null };
  if (v === "component test")
    return { __kind__: "ComponentTest", ComponentTest: null };
  if (v === "others")
    return { __kind__: "Others", Others: customPurpose.trim() };
  return null;
}

function parseIssues(val: string): Issue[] {
  if (!val || !val.trim()) return [];
  return val
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((desc) => ({ flag: IssueFlag.Other, description: desc }));
}

// ─── Row validator / mapper ───────────────────────────────────────────────────
function validateRow(
  raw: Record<string, string>,
  rowNum: number,
  models: VehicleModel[],
  routes: Route[],
): ParsedRow {
  const base: ParsedRow = { rowNum, valid: false, raw };

  const modelName = raw["Vehicle Model Name"]?.trim() ?? "";
  const routeName = raw["Route Name"]?.trim() ?? "";
  const riderName = raw["Rider Name"]?.trim() ?? "";

  if (!modelName) return { ...base, error: "Vehicle Model Name is required" };
  if (!routeName) return { ...base, error: "Route Name is required" };
  if (!riderName) return { ...base, error: "Rider Name is required" };

  const model = models.find(
    (m) => m.name.toLowerCase() === modelName.toLowerCase(),
  );
  if (!model)
    return { ...base, error: `Vehicle model "${modelName}" not found` };

  const route = routes.find(
    (r) => r.name.toLowerCase() === routeName.toLowerCase(),
  );
  if (!route) return { ...base, error: `Route "${routeName}" not found` };

  const testingModeRaw = raw["Testing Mode"]?.trim() ?? "";
  const customMode = raw["Custom Mode (if Other)"]?.trim() ?? "";
  if (!testingModeRaw) return { ...base, error: "Testing Mode is required" };
  if (testingModeRaw.toLowerCase() === "other" && !customMode) {
    return {
      ...base,
      error: "Custom Mode required when Testing Mode is Other",
    };
  }
  const testingMode = parseTestingMode(testingModeRaw, customMode);
  if (!testingMode)
    return {
      ...base,
      error: `Invalid Testing Mode: "${testingModeRaw}" (use Eco, City, Sport, or Other)`,
    };

  const testPurposeRaw = raw["Test Purpose"]?.trim() ?? "";
  const customPurpose = raw["Custom Test Purpose (if Others)"]?.trim() ?? "";
  if (!testPurposeRaw) return { ...base, error: "Test Purpose is required" };
  if (testPurposeRaw.toLowerCase() === "others" && !customPurpose) {
    return {
      ...base,
      error: "Custom Test Purpose required when Test Purpose is Others",
    };
  }
  const testPurpose = parseTestPurpose(testPurposeRaw, customPurpose);
  if (!testPurpose)
    return {
      ...base,
      error: `Invalid Test Purpose: "${testPurposeRaw}" (use Range, Durability, Component Test, or Others)`,
    };

  const rangeStartKm = Number.parseFloat(raw["Start KM"] ?? "0") || 0;
  const rangeStopKm = Number.parseFloat(raw["Stop KM"] ?? "0") || 0;
  const startSoc = raw["Start SOC (%)"]
    ? Number.parseFloat(raw["Start SOC (%)"])
    : null;
  const stopSoc = raw["Stop SOC (%)"]
    ? Number.parseFloat(raw["Stop SOC (%)"])
    : null;
  const topSpeedKmh = Number.parseFloat(raw["Top Speed (km/h)"] ?? "0") || 0;
  const avgSpeedKmh =
    Number.parseFloat(raw["Average Speed (km/h)"] ?? "0") || 0;
  const riderWeight = raw["Rider Weight (kg)"]
    ? Number.parseFloat(raw["Rider Weight (kg)"])
    : null;
  const coRiderWeight = raw["Co-rider Weight (kg)"]
    ? Number.parseFloat(raw["Co-rider Weight (kg)"])
    : null;
  const customRoute = raw["Custom Route (if Other mode)"]?.trim() || null;

  // Parse Date of Ride from the Date column
  const dateRawVal = (raw.Date ?? "").trim();
  const parsedDate = dateRawVal ? new Date(dateRawVal).getTime() : Number.NaN;
  const dateOfRide = Number.isNaN(parsedDate) ? undefined : parsedDate;

  const issues = parseIssues(raw["Issues (semicolon-separated)"] ?? "");

  return {
    rowNum,
    valid: true,
    raw,
    data: {
      vehicleModelId: model.id,
      routeId: route.id,
      riderName,
      rangeStartKm,
      rangeStopKm,
      startSoc,
      stopSoc,
      topSpeedKmh,
      avgSpeedKmh,
      issues,
      testingMode,
      customRoute,
      riderWeight,
      coRiderWeight,
      testPurpose,
      dateOfRide,
    },
  };
}

// ─── Preview Table ────────────────────────────────────────────────────────────
function PreviewRow({ row }: { row: ParsedRow }) {
  return (
    <tr
      className={`border-b border-border text-sm ${row.valid ? "" : "bg-destructive/5"}`}
    >
      <td className="px-3 py-2 text-center text-muted-foreground">
        {row.rowNum}
      </td>
      <td className="px-3 py-2">
        {row.valid ? (
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle2 size={14} /> Valid
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-destructive">
            <AlertCircle size={14} /> Error
          </span>
        )}
      </td>
      <td className="px-3 py-2 truncate max-w-[160px]">
        {row.raw["Vehicle Model Name"] ?? "—"}
      </td>
      <td className="px-3 py-2 truncate max-w-[140px]">
        {row.raw["Route Name"] ?? "—"}
      </td>
      <td className="px-3 py-2">{row.raw["Rider Name"] ?? "—"}</td>
      <td className="px-3 py-2">{row.raw["Testing Mode"] ?? "—"}</td>
      <td className="px-3 py-2">{row.raw["Test Purpose"] ?? "—"}</td>
      <td className="px-3 py-2 text-destructive text-xs">{row.error ?? ""}</td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminImport() {
  const { data: models = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();
  const createRecord = useAdminCreateTestRecord();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<{
    imported: number;
    errors: number;
  } | null>(null);

  const validRows = parsedRows.filter((r) => r.valid);
  const invalidRows = parsedRows.filter((r) => !r.valid);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSummary(null);
    setParsedRows([]);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = new Uint8Array(ev.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
          defval: "",
          raw: false,
        });
        if (rows.length === 0) {
          toast.error("The Excel file appears to be empty.");
          return;
        }
        const parsed = rows.map((row, idx) =>
          validateRow(row, idx + 2, models, routes),
        );
        setParsedRows(parsed);
        const valid = parsed.filter((r) => r.valid).length;
        toast.info(
          `Parsed ${parsed.length} rows — ${valid} valid, ${parsed.length - valid} with errors.`,
        );
      } catch {
        toast.error(
          "Failed to parse the Excel file. Make sure it's a valid .xlsx file.",
        );
      }
    };
    reader.readAsArrayBuffer(file);
    // Reset input so the same file can be re-uploaded
    e.target.value = "";
  };

  const handleImport = async () => {
    if (validRows.length === 0) return;
    setImporting(true);
    setProgress(0);
    setSummary(null);

    let imported = 0;
    let errors = 0;

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];
      if (!row.data) continue;
      try {
        await createRecord.mutateAsync({
          ...row.data,
          photoUrls: [],
        });
        imported++;
      } catch {
        errors++;
      }
      setProgress(Math.round(((i + 1) / validRows.length) * 100));
    }

    setImporting(false);
    setSummary({ imported, errors });
    if (errors === 0) {
      toast.success(`${imported} records imported successfully!`);
    } else {
      toast.warning(
        `Import complete: ${imported} succeeded, ${errors} failed.`,
      );
    }
  };

  const handleReset = () => {
    setParsedRows([]);
    setFileName(null);
    setSummary(null);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Import Data from Excel
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Admin only — bulk import test records from an Excel spreadsheet
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 shrink-0"
          onClick={downloadTemplate}
          data-ocid="import-download-template"
        >
          <Download size={16} />
          Download Sample Template
        </Button>
      </div>

      {/* Upload Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-primary" />
            Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 py-10 cursor-pointer hover:bg-muted/50 hover:border-primary/40 transition-colors"
            data-ocid="import-file-drop"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Upload size={22} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {fileName ? fileName : "Click to select an Excel file"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Accepts .xlsx files only. Use the template above for the correct
                format.
              </p>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="import-file-input"
          />

          {parsedRows.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="text-green-700 border-green-300 bg-green-50"
              >
                <CheckCircle2 size={12} className="mr-1" />
                {validRows.length} valid
              </Badge>
              {invalidRows.length > 0 && (
                <Badge
                  variant="outline"
                  className="text-destructive border-destructive/30 bg-destructive/5"
                >
                  <AlertCircle size={12} className="mr-1" />
                  {invalidRows.length} with errors
                </Badge>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X size={12} /> Clear
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Table */}
      {parsedRows.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Preview — {parsedRows.length} Rows
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[700px] text-sm"
                data-ocid="import-preview-table"
              >
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground w-12">
                      Row
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-24">
                      Status
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Vehicle Model
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Route
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Rider
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Mode
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Purpose
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parsedRows.map((row) => (
                    <PreviewRow key={row.rowNum} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Import Action */}
      {parsedRows.length > 0 && (
        <Card className="bg-card border-border">
          <CardContent className="pt-5 space-y-4">
            {importing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Importing records…</span>
                  <span>{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  className="h-2"
                  data-ocid="import-progress"
                />
              </div>
            )}

            {summary && (
              <div
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
                  summary.errors === 0
                    ? "border-green-300 bg-green-50 text-green-800"
                    : "border-amber-300 bg-amber-50 text-amber-800"
                }`}
                data-ocid="import-summary"
              >
                {summary.errors === 0 ? (
                  <CheckCircle2 size={16} className="shrink-0 text-green-700" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 text-amber-700" />
                )}
                <span>
                  Import complete:{" "}
                  <strong>{summary.imported} records imported</strong>
                  {summary.errors > 0 && `, ${summary.errors} failed`}.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-muted-foreground">
                {validRows.length > 0
                  ? `Ready to import ${validRows.length} valid row${validRows.length !== 1 ? "s" : ""}.${
                      invalidRows.length > 0
                        ? ` ${invalidRows.length} row${invalidRows.length !== 1 ? "s" : ""} will be skipped.`
                        : ""
                    }`
                  : "No valid rows to import. Fix errors in the file and re-upload."}
              </p>
              <Button
                onClick={handleImport}
                disabled={importing || validRows.length === 0}
                className="gap-2"
                data-ocid="import-submit-btn"
              >
                {importing ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Importing…
                  </>
                ) : (
                  <>
                    <Upload size={15} />
                    Import All Valid Rows
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions Card */}
      {parsedRows.length === 0 && (
        <Card className="bg-muted/30 border-border">
          <CardHeader>
            <CardTitle className="font-display text-sm text-muted-foreground">
              How to use Excel Import
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ol className="list-decimal list-inside space-y-1.5">
              <li>
                Click{" "}
                <strong className="text-foreground">
                  Download Sample Template
                </strong>{" "}
                above to get the correct Excel format.
              </li>
              <li>
                Fill in your test data. Vehicle Model Name and Route Name must
                match exactly what is configured in the system.
              </li>
              <li>
                For <strong className="text-foreground">Testing Mode</strong>{" "}
                use: Eco, City, Sport, or Other (fill Custom Mode if Other).
              </li>
              <li>
                For <strong className="text-foreground">Test Purpose</strong>{" "}
                use: Range, Durability, Component Test, or Others (fill Custom
                Purpose if Others).
              </li>
              <li>
                For <strong className="text-foreground">Issues</strong> separate
                multiple items with a semicolon, e.g.{" "}
                <code className="bg-muted px-1 rounded">
                  Battery drain;Brake noise
                </code>
              </li>
              <li>
                Upload the filled file. Review the preview table, then click{" "}
                <strong className="text-foreground">
                  Import All Valid Rows
                </strong>
                .
              </li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
