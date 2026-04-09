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
import {
  CalendarDays,
  Camera,
  ClipboardList,
  Loader2,
  Plus,
  Settings2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IssueFlag } from "../backend";
import type { Issue, TestPurpose, TestingMode } from "../backend";
import { PhotoUploadField } from "../components/PhotoUploadField";
import {
  useAdminCreateTestRecord,
  useRoutes,
  useVehicleModels,
} from "../hooks/useBackend";
import { usePhotoUpload } from "../hooks/usePhotoUpload";

const FLAG_OPTIONS = Object.values(IssueFlag);

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

export default function AdminEntry() {
  const { data: models = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();
  const addRecord = useAdminCreateTestRecord();

  const [modelId, setModelId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [riderName, setRiderName] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeStop, setRangeStop] = useState("");
  const [startSoc, setStartSoc] = useState("");
  const [stopSoc, setStopSoc] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issueFlag, setIssueFlag] = useState<IssueFlag>(IssueFlag.Other);
  const [issueDesc, setIssueDesc] = useState("");

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

  const removeIssue = (idx: number) => {
    setIssues((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelId || !routeId || !riderName.trim()) {
      toast.error("Please fill in all required fields");
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
        riderName: riderName.trim(),
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
      toast.success("Test record added successfully");
      setModelId("");
      setRouteId("");
      setRiderName("");
      setRangeStart("");
      setRangeStop("");
      setStartSoc("");
      setStopSoc("");
      setTopSpeed("");
      setAvgSpeed("");
      setIssues([]);
      setTestingModeKey("Eco");
      setCustomMode("");
      setCustomRouteText("");
      setRiderWeight("");
      setCoRiderWeight("");
      setTestPurposeKey("Range");
      setCustomPurpose("");
      setDateOfRide(new Date().toISOString().slice(0, 10));
      resetPhotos();
    } catch {
      toast.error("Failed to add test record");
    }
  };

  const isPending = addRecord.isPending || uploading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Manual Data Entry
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Admin: Enter test parameters for any session
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <ClipboardList size={18} className="text-primary" /> Session
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entry-date-of-ride">
                  <CalendarDays
                    size={13}
                    className="inline mr-1 text-primary"
                  />
                  Date of Ride <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="entry-date-of-ride"
                  type="date"
                  value={dateOfRide}
                  onChange={(e) => setDateOfRide(e.target.value)}
                  className="bg-input border-border"
                  data-ocid="entry-date-of-ride"
                />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Model *</Label>
                <Select value={modelId} onValueChange={setModelId}>
                  <SelectTrigger
                    className="bg-input border-border"
                    data-ocid="entry-model-select"
                  >
                    <SelectValue placeholder="Select model..." />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.id.toString()} value={m.id.toString()}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Test Route *</Label>
                <Select value={routeId} onValueChange={setRouteId}>
                  <SelectTrigger
                    className="bg-input border-border"
                    data-ocid="entry-route-select"
                  >
                    <SelectValue placeholder="Select route..." />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((r) => (
                      <SelectItem key={r.id.toString()} value={r.id.toString()}>
                        {r.name} ({r.distanceKm} km)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rider-name">Rider Name *</Label>
                <Input
                  id="rider-name"
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="bg-input border-border"
                  data-ocid="entry-rider-input"
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance Data */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">
                Performance Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="range-start">Range Start (km)</Label>
                  <Input
                    id="range-start"
                    type="number"
                    step="0.1"
                    min="0"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    placeholder="0.0"
                    className="bg-input border-border"
                    data-ocid="entry-range-start"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="range-stop">Range Stop (km)</Label>
                  <Input
                    id="range-stop"
                    type="number"
                    step="0.1"
                    min="0"
                    value={rangeStop}
                    onChange={(e) => setRangeStop(e.target.value)}
                    placeholder="0.0"
                    className="bg-input border-border"
                    data-ocid="entry-range-stop"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="start-soc">Start SOC (%)</Label>
                  <Input
                    id="start-soc"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={startSoc}
                    onChange={(e) => setStartSoc(e.target.value)}
                    placeholder="0–100"
                    className="bg-input border-border"
                    data-ocid="entry-start-soc"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stop-soc">Stop SOC (%)</Label>
                  <Input
                    id="stop-soc"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={stopSoc}
                    onChange={(e) => setStopSoc(e.target.value)}
                    placeholder="0–100"
                    className="bg-input border-border"
                    data-ocid="entry-stop-soc"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="top-speed">Top Speed (km/h)</Label>
                  <Input
                    id="top-speed"
                    type="number"
                    step="0.1"
                    min="0"
                    value={topSpeed}
                    onChange={(e) => setTopSpeed(e.target.value)}
                    placeholder="0.0"
                    className="bg-input border-border"
                    data-ocid="entry-top-speed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avg-speed">Avg Speed (km/h)</Label>
                  <Input
                    id="avg-speed"
                    type="number"
                    step="0.1"
                    min="0"
                    value={avgSpeed}
                    onChange={(e) => setAvgSpeed(e.target.value)}
                    placeholder="0.0"
                    className="bg-input border-border"
                    data-ocid="entry-avg-speed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Mode & Purpose */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Settings2 size={18} className="text-primary" /> Testing Mode
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
                        data-ocid={`entry-mode-${m.toLowerCase()}`}
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
                    <Label htmlFor="entry-custom-mode">
                      Custom Mode <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="entry-custom-mode"
                      value={customMode}
                      onChange={(e) => setCustomMode(e.target.value)}
                      placeholder="e.g. Highway, Offroad..."
                      className="bg-input border-border"
                      data-ocid="entry-custom-mode"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entry-custom-route">
                      Route (Manual Entry)
                    </Label>
                    <Input
                      id="entry-custom-route"
                      value={customRouteText}
                      onChange={(e) => setCustomRouteText(e.target.value)}
                      placeholder="Describe the custom route..."
                      className="bg-input border-border"
                      data-ocid="entry-custom-route"
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
                      data-ocid={`entry-purpose-${key.toLowerCase()}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {testPurposeKey === "Others" && (
                <div className="space-y-2">
                  <Label htmlFor="entry-custom-purpose">
                    Describe Purpose <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="entry-custom-purpose"
                    value={customPurpose}
                    onChange={(e) => setCustomPurpose(e.target.value)}
                    placeholder="e.g. Motor stress test..."
                    className="bg-input border-border"
                    data-ocid="entry-custom-purpose"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rider Weight */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <User size={18} className="text-primary" /> Rider Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entry-rider-weight">
                  Rider Weight (kg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="entry-rider-weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="200"
                  value={riderWeight}
                  onChange={(e) => setRiderWeight(e.target.value)}
                  placeholder="e.g. 72"
                  className="bg-input border-border"
                  data-ocid="entry-rider-weight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-co-rider-weight">
                  Co-rider Weight (kg){" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="entry-co-rider-weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="200"
                  value={coRiderWeight}
                  onChange={(e) => setCoRiderWeight(e.target.value)}
                  placeholder="Leave blank if no co-rider"
                  className="bg-input border-border"
                  data-ocid="entry-co-rider-weight"
                />
              </div>
            </CardContent>
          </Card>

          {/* Issues */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-base">
                Issues / Problems Observed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 flex-wrap items-end">
                <div className="space-y-2 w-40">
                  <Label>Issue Type</Label>
                  <Select
                    value={issueFlag}
                    onValueChange={(v) => setIssueFlag(v as IssueFlag)}
                  >
                    <SelectTrigger
                      className="bg-input border-border"
                      data-ocid="entry-issue-flag"
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
                <div className="space-y-2 flex-1 min-w-48">
                  <Label htmlFor="issue-desc">Description</Label>
                  <Input
                    id="issue-desc"
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    placeholder="Describe the issue..."
                    className="bg-input border-border"
                    data-ocid="entry-issue-desc"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addIssue}
                  className="gap-1"
                  data-ocid="add-issue-btn"
                >
                  <Plus size={14} /> Add Issue
                </Button>
              </div>

              {issues.length > 0 && (
                <div className="space-y-2">
                  {issues.map((issue, idx) => (
                    <div
                      key={`${issue.flag}-${idx}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {issue.flag}
                        </Badge>
                        <span className="text-sm text-foreground truncate">
                          {issue.description}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIssue(idx)}
                        className="ml-2 text-muted-foreground hover:text-destructive transition-smooth"
                        aria-label="Remove issue"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Camera size={18} className="text-primary" /> Session Photos
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
                label="Upload test session photos (max 5)"
                data-ocid="admin-photo-upload"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            data-ocid="entry-submit-btn"
            className="gap-2 px-8"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Save Test Record
          </Button>
        </div>
      </form>
    </div>
  );
}
