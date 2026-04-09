import { b as useVehicleModels, d as useRoutes, w as useAdminCreateTestRecord, r as reactExports, x as IssueFlag, j as jsxRuntimeExports, f as ClipboardList, L as Label, I as Input, B as Button, X, s as ue } from "./index-CvDcA4vm.js";
import { B as Badge } from "./badge-BsUQqHHD.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DAQ316_z.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-PLUnNzmp.js";
import { u as usePhotoUpload, C as CalendarDays, S as Settings2, P as PhotoUploadField } from "./usePhotoUpload-tqy2TAyD.js";
import { U as User } from "./user-BS898mNZ.js";
import { P as Plus } from "./plus-CYJTe5i_.js";
import { C as Camera } from "./camera-DJUyW5yx.js";
import { L as LoaderCircle } from "./loader-circle-BksO7P1b.js";
const FLAG_OPTIONS = Object.values(IssueFlag);
function buildTestingMode(modeKey, customMode) {
  if (modeKey === "Eco") return { __kind__: "Eco", Eco: null };
  if (modeKey === "City") return { __kind__: "City", City: null };
  if (modeKey === "Sport") return { __kind__: "Sport", Sport: null };
  return { __kind__: "Other", Other: customMode };
}
function buildTestPurpose(purposeKey, customPurpose) {
  if (purposeKey === "Range") return { __kind__: "Range", Range: null };
  if (purposeKey === "Durability")
    return { __kind__: "Durability", Durability: null };
  if (purposeKey === "ComponentTest")
    return { __kind__: "ComponentTest", ComponentTest: null };
  return { __kind__: "Others", Others: customPurpose };
}
function AdminEntry() {
  const { data: models = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();
  const addRecord = useAdminCreateTestRecord();
  const [modelId, setModelId] = reactExports.useState("");
  const [routeId, setRouteId] = reactExports.useState("");
  const [riderName, setRiderName] = reactExports.useState("");
  const [rangeStart, setRangeStart] = reactExports.useState("");
  const [rangeStop, setRangeStop] = reactExports.useState("");
  const [startSoc, setStartSoc] = reactExports.useState("");
  const [stopSoc, setStopSoc] = reactExports.useState("");
  const [topSpeed, setTopSpeed] = reactExports.useState("");
  const [avgSpeed, setAvgSpeed] = reactExports.useState("");
  const [issues, setIssues] = reactExports.useState([]);
  const [issueFlag, setIssueFlag] = reactExports.useState(IssueFlag.Other);
  const [issueDesc, setIssueDesc] = reactExports.useState("");
  const [testingModeKey, setTestingModeKey] = reactExports.useState("Eco");
  const [customMode, setCustomMode] = reactExports.useState("");
  const [customRouteText, setCustomRouteText] = reactExports.useState("");
  const [riderWeight, setRiderWeight] = reactExports.useState("");
  const [coRiderWeight, setCoRiderWeight] = reactExports.useState("");
  const [testPurposeKey, setTestPurposeKey] = reactExports.useState("Range");
  const [customPurpose, setCustomPurpose] = reactExports.useState("");
  const [dateOfRide, setDateOfRide] = reactExports.useState(
    () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  );
  const {
    photos,
    uploading,
    uploadProgress,
    addPhotos,
    removePhoto,
    uploadAllPhotos,
    resetPhotos,
    canAddMore
  } = usePhotoUpload(5);
  const addIssue = () => {
    if (!issueDesc.trim()) return;
    setIssues((prev) => [
      ...prev,
      { flag: issueFlag, description: issueDesc.trim() }
    ]);
    setIssueDesc("");
  };
  const removeIssue = (idx) => {
    setIssues((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelId || !routeId || !riderName.trim()) {
      ue.error("Please fill in all required fields");
      return;
    }
    if (!riderWeight) {
      ue.error("Rider Weight is required");
      return;
    }
    if (testingModeKey === "Other" && !customMode.trim()) {
      ue.error("Please enter a custom testing mode");
      return;
    }
    if (testPurposeKey === "Others" && !customPurpose.trim()) {
      ue.error("Please describe the test purpose");
      return;
    }
    try {
      let photoUrls;
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
        customRoute: testingModeKey === "Other" ? customRouteText.trim() || null : null,
        riderWeight: Number.parseFloat(riderWeight),
        coRiderWeight: coRiderWeight ? Number.parseFloat(coRiderWeight) : null,
        testPurpose: buildTestPurpose(testPurposeKey, customPurpose.trim()),
        dateOfRide: dateOfRide ? new Date(dateOfRide).getTime() : void 0
      });
      ue.success("Test record added successfully");
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
      setDateOfRide((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
      resetPhotos();
    } catch {
      ue.error("Failed to add test record");
    }
  };
  const isPending = addRecord.isPending || uploading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Manual Data Entry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Admin: Enter test parameters for any session" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18, className: "text-primary" }),
            " Session Details"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "entry-date-of-ride", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CalendarDays,
                  {
                    size: 13,
                    className: "inline mr-1 text-primary"
                  }
                ),
                "Date of Ride ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "entry-date-of-ride",
                  type: "date",
                  value: dateOfRide,
                  onChange: (e) => setDateOfRide(e.target.value),
                  className: "bg-input border-border",
                  "data-ocid": "entry-date-of-ride"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Model *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: modelId, onValueChange: setModelId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-input border-border",
                    "data-ocid": "entry-model-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select model..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id.toString(), children: m.name }, m.id.toString())) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Test Route *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: routeId, onValueChange: setRouteId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-input border-border",
                    "data-ocid": "entry-route-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select route..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: routes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r.id.toString(), children: [
                  r.name,
                  " (",
                  r.distanceKm,
                  " km)"
                ] }, r.id.toString())) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rider-name", children: "Rider Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rider-name",
                  value: riderName,
                  onChange: (e) => setRiderName(e.target.value),
                  placeholder: "e.g. Rahul Sharma",
                  className: "bg-input border-border",
                  "data-ocid": "entry-rider-input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Performance Parameters" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "range-start", children: "Range Start (km)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "range-start",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: rangeStart,
                    onChange: (e) => setRangeStart(e.target.value),
                    placeholder: "0.0",
                    className: "bg-input border-border",
                    "data-ocid": "entry-range-start"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "range-stop", children: "Range Stop (km)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "range-stop",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: rangeStop,
                    onChange: (e) => setRangeStop(e.target.value),
                    placeholder: "0.0",
                    className: "bg-input border-border",
                    "data-ocid": "entry-range-stop"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start-soc", children: "Start SOC (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "start-soc",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    max: "100",
                    value: startSoc,
                    onChange: (e) => setStartSoc(e.target.value),
                    placeholder: "0–100",
                    className: "bg-input border-border",
                    "data-ocid": "entry-start-soc"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stop-soc", children: "Stop SOC (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "stop-soc",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    max: "100",
                    value: stopSoc,
                    onChange: (e) => setStopSoc(e.target.value),
                    placeholder: "0–100",
                    className: "bg-input border-border",
                    "data-ocid": "entry-stop-soc"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "top-speed", children: "Top Speed (km/h)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "top-speed",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: topSpeed,
                    onChange: (e) => setTopSpeed(e.target.value),
                    placeholder: "0.0",
                    className: "bg-input border-border",
                    "data-ocid": "entry-top-speed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "avg-speed", children: "Avg Speed (km/h)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "avg-speed",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: avgSpeed,
                    onChange: (e) => setAvgSpeed(e.target.value),
                    placeholder: "0.0",
                    className: "bg-input border-border",
                    "data-ocid": "entry-avg-speed"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 18, className: "text-primary" }),
            " Testing Mode & Purpose"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Testing Mode ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ["Eco", "City", "Sport", "Other"].map(
                (m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTestingModeKey(m),
                    className: `rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${testingModeKey === m ? "border-primary bg-primary/10 text-primary" : "border-border bg-input text-foreground hover:bg-muted/50"}`,
                    "data-ocid": `entry-mode-${m.toLowerCase()}`,
                    children: m
                  },
                  m
                )
              ) })
            ] }),
            testingModeKey === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "entry-custom-mode", children: [
                  "Custom Mode ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "entry-custom-mode",
                    value: customMode,
                    onChange: (e) => setCustomMode(e.target.value),
                    placeholder: "e.g. Highway, Offroad...",
                    className: "bg-input border-border",
                    "data-ocid": "entry-custom-mode"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "entry-custom-route", children: "Route (Manual Entry)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "entry-custom-route",
                    value: customRouteText,
                    onChange: (e) => setCustomRouteText(e.target.value),
                    placeholder: "Describe the custom route...",
                    className: "bg-input border-border",
                    "data-ocid": "entry-custom-route"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Why Testing? ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                ["Range", "Range"],
                ["Durability", "Durability"],
                ["ComponentTest", "Component Test"],
                ["Others", "Others"]
              ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTestPurposeKey(key),
                  className: `rounded-lg border px-3 py-2 text-sm font-medium transition-colors text-left ${testPurposeKey === key ? "border-primary bg-primary/10 text-primary" : "border-border bg-input text-foreground hover:bg-muted/50"}`,
                  "data-ocid": `entry-purpose-${key.toLowerCase()}`,
                  children: label
                },
                key
              )) })
            ] }),
            testPurposeKey === "Others" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "entry-custom-purpose", children: [
                "Describe Purpose ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "entry-custom-purpose",
                  value: customPurpose,
                  onChange: (e) => setCustomPurpose(e.target.value),
                  placeholder: "e.g. Motor stress test...",
                  className: "bg-input border-border",
                  "data-ocid": "entry-custom-purpose"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" }),
            " Rider Information"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "entry-rider-weight", children: [
                "Rider Weight (kg) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "entry-rider-weight",
                  type: "number",
                  step: "0.1",
                  min: "30",
                  max: "200",
                  value: riderWeight,
                  onChange: (e) => setRiderWeight(e.target.value),
                  placeholder: "e.g. 72",
                  className: "bg-input border-border",
                  "data-ocid": "entry-rider-weight"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "entry-co-rider-weight", children: [
                "Co-rider Weight (kg)",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "entry-co-rider-weight",
                  type: "number",
                  step: "0.1",
                  min: "30",
                  max: "200",
                  value: coRiderWeight,
                  onChange: (e) => setCoRiderWeight(e.target.value),
                  placeholder: "Leave blank if no co-rider",
                  className: "bg-input border-border",
                  "data-ocid": "entry-co-rider-weight"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Issues / Problems Observed" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Issue Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: issueFlag,
                    onValueChange: (v) => setIssueFlag(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-input border-border",
                          "data-ocid": "entry-issue-flag",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FLAG_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 min-w-48", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "issue-desc", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "issue-desc",
                    value: issueDesc,
                    onChange: (e) => setIssueDesc(e.target.value),
                    placeholder: "Describe the issue...",
                    className: "bg-input border-border",
                    "data-ocid": "entry-issue-desc"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: addIssue,
                  className: "gap-1",
                  "data-ocid": "add-issue-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                    " Add Issue"
                  ]
                }
              )
            ] }),
            issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: issues.map((issue, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs shrink-0", children: issue.flag }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: issue.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeIssue(idx),
                      className: "ml-2 text-muted-foreground hover:text-destructive transition-smooth",
                      "aria-label": "Remove issue",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                    }
                  )
                ]
              },
              `${issue.flag}-${idx}`
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18, className: "text-primary" }),
            " Session Photos"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoUploadField,
            {
              photos,
              onAdd: addPhotos,
              onRemove: removePhoto,
              canAddMore,
              uploading,
              uploadProgress,
              label: "Upload test session photos (max 5)",
              "data-ocid": "admin-photo-upload"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          size: "lg",
          disabled: isPending,
          "data-ocid": "entry-submit-btn",
          className: "gap-2 px-8",
          children: [
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Save Test Record"
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AdminEntry as default
};
