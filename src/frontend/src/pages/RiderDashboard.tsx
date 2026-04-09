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
  ActivitySquare,
  AlertTriangle,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Loader2,
  MapPin,
  Plus,
  Settings2,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IssueFlag } from "../backend";
import type { Issue, TestPurpose, TestingMode } from "../backend";
import { PhotoUploadField } from "../components/PhotoUploadField";
import { useAuth } from "../hooks/useAuth";
import {
  useAddTestRecord,
  useRoutes,
  useTestRecords,
  useVehicleModels,
} from "../hooks/useBackend";
import { usePhotoUpload } from "../hooks/usePhotoUpload";

const FLAG_OPTIONS = Object.values(IssueFlag);

const FLAG_COLORS: Record<IssueFlag, string> = {
  [IssueFlag.Mechanical]:
    "bg-destructive/15 text-destructive border-destructive/30",
  [IssueFlag.Electrical]: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  [IssueFlag.Software]: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  [IssueFlag.Performance]: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  [IssueFlag.Safety]: "bg-accent/15 text-accent border-accent/30",
  [IssueFlag.Other]: "bg-muted/50 text-muted-foreground border-border",
};

type TestingModeKey = "Eco" | "City" | "Sport" | "Other";
type TestPurposeKey = "Range" | "Durability" | "ComponentTest" | "Others";

function buildTestingMode(
  modeKey: TestingModeKey,
  customMode: string,
): TestingMode {
  if (modeKey === "Eco") return { __kind__: "Eco", Eco: null };
  if (modeKey === "City") return { __kind__: "City", City: null };
  if (modeKey === "Sport") return { __kind__: "Sport", Sport: null };
  return { __kind__: "Other", Other: customMode };
}

function buildTestPurpose(
  purposeKey: TestPurposeKey,
  customPurpose: string,
): TestPurpose {
  if (purposeKey === "Range") return { __kind__: "Range", Range: null };
  if (purposeKey === "Durability")
    return { __kind__: "Durability", Durability: null };
  if (purposeKey === "ComponentTest")
    return { __kind__: "ComponentTest", ComponentTest: null };
  return { __kind__: "Others", Others: customPurpose };
}

export default function RiderDashboard() {
  const { profile } = useAuth();
  const { data: models = [], isLoading: modelsLoading } = useVehicleModels();
  const { data: routes = [], isLoading: routesLoading } = useRoutes();
  const { data: allRecords = [], isLoading: recordsLoading } = useTestRecords();
  const addRecord = useAddTestRecord();

  const myRecords = allRecords.filter((r) => r.riderName === profile?.name);
  const today = new Date().toDateString();
  const todayCount = myRecords.filter(
    (r) => new Date(Number(r.timestamp) / 1_000_000).toDateString() === today,
  ).length;

  // Core fields
  const [modelId, setModelId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeStop, setRangeStop] = useState("");
  const [startSoc, setStartSoc] = useState("");
  const [stopSoc, setStopSoc] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issueFlag, setIssueFlag] = useState<IssueFlag>(IssueFlag.Other);
  const [issueDesc, setIssueDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // New fields
  const [testingModeKey, setTestingModeKey] = useState<TestingModeKey>("Eco");
  const [customMode, setCustomMode] = useState("");
  const [customRouteText, setCustomRouteText] = useState("");
  const [riderWeight, setRiderWeight] = useState("");
  const [coRiderWeight, setCoRiderWeight] = useState("");
  const [testPurposeKey, setTestPurposeKey] = useState<TestPurposeKey>("Range");
  const [customPurpose, setCustomPurpose] = useState("");
  const [dateOfRide, setDateOfRide] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );

  const {
    photos,
    uploading,
    uploadProgress,
    addPhotos,
    removePhoto,
    uploadAllPhotos,
    resetPhotos,
    canAddMore,
  } = usePhotoUpload(5);

  const addIssue = () => {
    if (!issueDesc.trim()) return;
    setIssues((prev) => [
      ...prev,
      { flag: issueFlag, description: issueDesc.trim() },
    ]);
    setIssueDesc("");
  };

  const removeIssue = (idx: number) =>
    setIssues((prev) => prev.filter((_, i) => i !== idx));

  const resetForm = () => {
    setModelId("");
    setRouteId("");
    setRangeStart("");
    setRangeStop("");
    setStartSoc("");
    setStopSoc("");
    setTopSpeed("");
    setAvgSpeed("");
    setIssues([]);
    setIssueDesc("");
    setTestingModeKey("Eco");
    setCustomMode("");
    setCustomRouteText("");
    setRiderWeight("");
    setCoRiderWeight("");
    setTestPurposeKey("Range");
    setCustomPurpose("");
    setDateOfRide(new Date().toISOString().slice(0, 10));
    resetPhotos();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelId || !routeId) {
      toast.error("Please select a vehicle model and route");
      return;
    }
    if (!riderWeight) {
      toast.error("Rider Weight is required");
      return;
    }
    if (testingModeKey === "Other" && !customMode.trim()) {
      toast.error("Please enter a custom testing mode");
      return;
    }
    if (testPurposeKey === "Others" && !customPurpose.trim()) {
      toast.error("Please describe the test purpose");
      return;
    }
    try {
      let photoUrls: string[] | undefined;
      if (photos.length > 0) {
        photoUrls = await uploadAllPhotos();
      }
      await addRecord.mutateAsync({
        vehicleModelId: BigInt(modelId),
        routeId: BigInt(routeId),
        riderName: profile?.name ?? "Unknown",
        rangeStartKm: Number.parseFloat(rangeStart) || 0,
        rangeStopKm: Number.parseFloat(rangeStop) || 0,
        startSoc: startSoc ? Number.parseFloat(startSoc) : null,
        stopSoc: stopSoc ? Number.parseFloat(stopSoc) : null,
        topSpeedKmh: Number.parseFloat(topSpeed) || 0,
        avgSpeedKmh: Number.parseFloat(avgSpeed) || 0,
        issues,
        photoUrls,
        testingMode: buildTestingMode(testingModeKey, customMode.trim()),
        customRoute:
          testingModeKey === "Other" ? customRouteText.trim() || null : null,
        riderWeight: Number.parseFloat(riderWeight),
        coRiderWeight: coRiderWeight ? Number.parseFloat(coRiderWeight) : null,
        testPurpose: buildTestPurpose(testPurposeKey, customPurpose.trim()),
        dateOfRide: dateOfRide ? new Date(dateOfRide).getTime() : undefined,
      });
      toast.success("Test data submitted successfully!");
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      toast.error("Failed to submit test data");
    }
  };

  const isPending = addRecord.isPending || uploading;
  const statsLoading = recordsLoading;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-card border border-border px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-display font-bold text-foreground truncate">
            Welcome back, {profile?.name ?? "Rider"} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Submit your latest EV test session data below
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {statsLoading ? (
            <>
              <Skeleton className="h-14 w-24 rounded-lg" />
              <Skeleton className="h-14 w-24 rounded-lg" />
            </>
          ) : (
            <>
              <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-center">
                <p className="text-2xl font-display font-bold text-primary">
                  {todayCount}
                </p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <div className="rounded-lg bg-muted/50 border border-border px-4 py-2 text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {myRecords.length}
                </p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success flash */}
      {submitted && (
        <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-accent">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">
            Session submitted successfully!
          </span>
        </div>
      )}

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Session Details */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <MapPin size={15} className="text-primary" /> Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rider-date-of-ride">
                  <CalendarDays
                    size={13}
                    className="inline mr-1 text-primary"
                  />
                  Date of Ride <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="rider-date-of-ride"
                  type="date"
                  value={dateOfRide}
                  onChange={(e) => setDateOfRide(e.target.value)}
                  className="bg-input border-border"
                  data-ocid="rider-date-of-ride"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rider-model">
                  Vehicle Model <span className="text-destructive">*</span>
                </Label>
                {modelsLoading ? (
                  <Skeleton className="h-10 rounded-md" />
                ) : (
                  <Select value={modelId} onValueChange={setModelId}>
                    <SelectTrigger
                      id="rider-model"
                      className="bg-input border-border"
                      data-ocid="rider-model-select"
                    >
                      <SelectValue placeholder="Select vehicle model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem
                          key={m.id.toString()}
                          value={m.id.toString()}
                        >
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rider-route">
                  Test Route <span className="text-destructive">*</span>
                </Label>
                {routesLoading ? (
                  <Skeleton className="h-10 rounded-md" />
                ) : (
                  <Select value={routeId} onValueChange={setRouteId}>
                    <SelectTrigger
                      id="rider-route"
                      className="bg-input border-border"
                      data-ocid="rider-route-select"
                    >
                      <SelectValue placeholder="Select test route..." />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((r) => (
                        <SelectItem
                          key={r.id.toString()}
                          value={r.id.toString()}
                        >
                          {r.name} — {r.distanceKm} km
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Data */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <Gauge size={15} className="text-primary" /> Performance Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="r-range-start">Range Start (km)</Label>
                  <Input
                    id="r-range-start"
                    type="number"
                    step="0.1"
                    min="0"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    placeholder="e.g. 120.0"
                    className="bg-input border-border"
                    data-ocid="rider-range-start"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r-range-stop">Range Stop (km)</Label>
                  <Input
                    id="r-range-stop"
                    type="number"
                    step="0.1"
                    min="0"
                    value={rangeStop}
                    onChange={(e) => setRangeStop(e.target.value)}
                    placeholder="e.g. 95.0"
                    className="bg-input border-border"
                    data-ocid="rider-range-stop"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="r-start-soc">
                    <Zap size={12} className="inline mr-1 text-accent" />
                    Start SOC (%)
                  </Label>
                  <Input
                    id="r-start-soc"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={startSoc}
                    onChange={(e) => setStartSoc(e.target.value)}
                    placeholder="0 – 100"
                    className="bg-input border-border"
                    data-ocid="rider-start-soc"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r-stop-soc">
                    <Zap size={12} className="inline mr-1 text-accent" />
                    Stop SOC (%)
                  </Label>
                  <Input
                    id="r-stop-soc"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={stopSoc}
                    onChange={(e) => setStopSoc(e.target.value)}
                    placeholder="0 – 100"
                    className="bg-input border-border"
                    data-ocid="rider-stop-soc"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="r-top-speed">Top Speed (km/h)</Label>
                  <Input
                    id="r-top-speed"
                    type="number"
                    step="0.1"
                    min="0"
                    value={topSpeed}
                    onChange={(e) => setTopSpeed(e.target.value)}
                    placeholder="e.g. 72.5"
                    className="bg-input border-border"
                    data-ocid="rider-top-speed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r-avg-speed">Avg Speed (km/h)</Label>
                  <Input
                    id="r-avg-speed"
                    type="number"
                    step="0.1"
                    min="0"
                    value={avgSpeed}
                    onChange={(e) => setAvgSpeed(e.target.value)}
                    placeholder="e.g. 45.0"
                    className="bg-input border-border"
                    data-ocid="rider-avg-speed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Mode & Test Purpose */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <Settings2 size={15} className="text-primary" /> Testing Mode
                &amp; Purpose
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Testing Mode */}
              <div className="space-y-2">
                <Label>
                  Testing Mode <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Eco", "City", "Sport", "Other"] as TestingModeKey[]).map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTestingModeKey(m)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          testingModeKey === m
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-input text-foreground hover:bg-muted/50"
                        }`}
                        data-ocid={`rider-mode-${m.toLowerCase()}`}
                      >
                        {m}
                      </button>
                    ),
                  )}
                </div>
              </div>
              {testingModeKey === "Other" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="r-custom-mode">
                      Custom Mode <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="r-custom-mode"
                      value={customMode}
                      onChange={(e) => setCustomMode(e.target.value)}
                      placeholder="e.g. Highway, Offroad..."
                      className="bg-input border-border"
                      data-ocid="rider-custom-mode"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-custom-route">Route (Manual Entry)</Label>
                    <Input
                      id="r-custom-route"
                      value={customRouteText}
                      onChange={(e) => setCustomRouteText(e.target.value)}
                      placeholder="Describe the custom route..."
                      className="bg-input border-border"
                      data-ocid="rider-custom-route"
                    />
                  </div>
                </>
              )}

              {/* Test Purpose */}
              <div className="space-y-2 pt-1">
                <Label>
                  Why Testing? <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["Range", "Range"],
                      ["Durability", "Durability"],
                      ["ComponentTest", "Component Test"],
                      ["Others", "Others"],
                    ] as [TestPurposeKey, string][]
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTestPurposeKey(key)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors text-left ${
                        testPurposeKey === key
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-input text-foreground hover:bg-muted/50"
                      }`}
                      data-ocid={`rider-purpose-${key.toLowerCase()}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {testPurposeKey === "Others" && (
                <div className="space-y-2">
                  <Label htmlFor="r-custom-purpose">
                    Describe Purpose <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="r-custom-purpose"
                    value={customPurpose}
                    onChange={(e) => setCustomPurpose(e.target.value)}
                    placeholder="e.g. Motor stress test..."
                    className="bg-input border-border"
                    data-ocid="rider-custom-purpose"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rider Weight */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <User size={15} className="text-primary" /> Rider Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="r-rider-weight">
                  Rider Weight (kg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="r-rider-weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="200"
                  value={riderWeight}
                  onChange={(e) => setRiderWeight(e.target.value)}
                  placeholder="e.g. 72"
                  className="bg-input border-border"
                  data-ocid="rider-weight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="r-co-rider-weight">
                  Co-rider Weight (kg){" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="r-co-rider-weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="200"
                  value={coRiderWeight}
                  onChange={(e) => setCoRiderWeight(e.target.value)}
                  placeholder="Leave blank if no co-rider"
                  className="bg-input border-border"
                  data-ocid="rider-co-rider-weight"
                />
              </div>
            </CardContent>
          </Card>

          {/* Issues Section */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <AlertTriangle size={15} className="text-destructive" />{" "}
                Observed Issues
                {issues.length > 0 && (
                  <Badge className="ml-auto bg-destructive/15 text-destructive border-destructive/30 font-mono text-xs">
                    {issues.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-end">
                <div className="space-y-2 w-full sm:w-44">
                  <Label>Issue Type</Label>
                  <Select
                    value={issueFlag}
                    onValueChange={(v) => setIssueFlag(v as IssueFlag)}
                  >
                    <SelectTrigger
                      className="bg-input border-border"
                      data-ocid="rider-issue-flag"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FLAG_OPTIONS.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex-1 min-w-0 w-full sm:w-auto">
                  <Label htmlFor="r-issue-desc">Description</Label>
                  <Input
                    id="r-issue-desc"
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addIssue();
                      }
                    }}
                    placeholder="Describe the issue observed..."
                    className="bg-input border-border"
                    data-ocid="rider-issue-desc"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addIssue}
                  disabled={!issueDesc.trim()}
                  className="gap-1.5 shrink-0 w-full sm:w-auto"
                  data-ocid="rider-add-issue-btn"
                >
                  <Plus size={14} /> Add Issue
                </Button>
              </div>

              {issues.length > 0 && (
                <div className="space-y-2">
                  {issues.map((issue, idx) => (
                    <div
                      key={`${issue.flag}-${idx}`}
                      className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2.5 gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${FLAG_COLORS[issue.flag]}`}
                        >
                          {issue.flag}
                        </Badge>
                        <span className="text-sm text-foreground truncate">
                          {issue.description}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIssue(idx)}
                        className="ml-1 p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0"
                        aria-label="Remove issue"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {issues.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  No issues added — add any observations from the test session
                  above
                </p>
              )}
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <Camera size={15} className="text-primary" /> Session Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoUploadField
                photos={photos}
                onAdd={addPhotos}
                onRemove={removePhoto}
                canAddMore={canAddMore}
                uploading={uploading}
                uploadProgress={uploadProgress}
                enableCamera
                label="Add session captures (max 5)"
                data-ocid="rider-photo-upload"
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <p className="text-xs text-muted-foreground">
            <span className="text-destructive">*</span> Required fields
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="flex-1 sm:flex-none"
              data-ocid="rider-reset-btn"
            >
              Clear
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isPending || !modelId || !routeId}
              data-ocid="rider-submit-btn"
              className="gap-2 flex-1 sm:flex-none px-8"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ActivitySquare size={16} />
              )}
              Submit Test Data
            </Button>
          </div>
        </div>
      </form>

      {/* Recent Submissions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <ClipboardList size={17} className="text-primary" />
            Recent Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recordsLoading ? (
            <div className="space-y-2">
              {["a", "b"].map((k) => (
                <Skeleton key={k} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : myRecords.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No sessions submitted yet. Fill in the form above to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {myRecords.slice(0, 5).map((r) => (
                <div
                  key={r.id.toString()}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3 gap-2"
                  data-ocid={`rider-recent-${r.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {r.vehicleModelName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.routeName} ·{" "}
                        {new Date(
                          Number(r.timestamp) / 1_000_000,
                        ).toLocaleDateString()}
                        {r.testingMode && (
                          <span className="ml-1 text-primary">
                            ·{" "}
                            {r.testingMode.__kind__ === "Other"
                              ? r.testingMode.Other
                              : r.testingMode.__kind__}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="font-mono">
                      {r.rangeStartKm}→{r.rangeStopKm} km
                    </span>
                    <span className="text-accent font-medium">
                      {r.startSoc != null ? `↓${r.startSoc}%` : ""}
                      {r.startSoc != null && r.stopSoc != null ? "→" : ""}
                      {r.stopSoc != null ? `${r.stopSoc}%` : ""}
                      {r.startSoc == null && r.stopSoc == null
                        ? "SOC —"
                        : " SOC"}
                    </span>
                    {r.issues.length > 0 && (
                      <span className="flex items-center gap-1 text-destructive">
                        <AlertTriangle size={11} />
                        {r.issues.length}
                      </span>
                    )}
                    {r.photoUrls?.length > 0 && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Camera size={11} />
                        {r.photoUrls.length}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {myRecords.length > 5 && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Showing 5 of {myRecords.length} — view all in My Records
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
