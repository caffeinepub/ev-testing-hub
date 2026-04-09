import { c as createLucideIcon, u as useAuth, b as useVehicleModels, d as useRoutes, g as useTestRecords, Y as useAddTestRecord, r as reactExports, l as IssueFlag, j as jsxRuntimeExports, S as Skeleton, M as MapPin, L as Label, I as Input, Z as Zap, B as Button, X, f as ClipboardList, t as ue } from "./index--L95CfR1.js";
import { B as Badge } from "./badge-D4hkwevr.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-CXHFdwVg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3eMgIaDE.js";
import { u as usePhotoUpload, C as CalendarDays, S as Settings2, P as PhotoUploadField } from "./usePhotoUpload-BPR9BHVa.js";
import { C as CircleCheck } from "./circle-check-C1M9bucO.js";
import { U as User } from "./user-BMs28ufw.js";
import { T as TriangleAlert } from "./triangle-alert-D8Wyv4T1.js";
import { P as Plus } from "./plus-cMgvVr22.js";
import { C as Camera } from "./camera-imtb5vq4.js";
import { L as LoaderCircle } from "./loader-circle-By20MbXa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
];
const Gauge = createLucideIcon("gauge", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M17 12h-2l-2 5-2-10-2 5H7", key: "15hlnc" }]
];
const SquareActivity = createLucideIcon("square-activity", __iconNode);
const FLAG_OPTIONS = Object.values(IssueFlag);
const FLAG_COLORS = {
  [IssueFlag.Mechanical]: "bg-destructive/15 text-destructive border-destructive/30",
  [IssueFlag.Electrical]: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  [IssueFlag.Software]: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  [IssueFlag.Performance]: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  [IssueFlag.Safety]: "bg-accent/15 text-accent border-accent/30",
  [IssueFlag.Other]: "bg-muted/50 text-muted-foreground border-border"
};
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
function RiderDashboard() {
  const { profile } = useAuth();
  const { data: models = [], isLoading: modelsLoading } = useVehicleModels();
  const { data: routes = [], isLoading: routesLoading } = useRoutes();
  const { data: allRecords = [], isLoading: recordsLoading } = useTestRecords();
  const addRecord = useAddTestRecord();
  const myRecords = allRecords.filter((r) => r.riderName === (profile == null ? void 0 : profile.name));
  const today = (/* @__PURE__ */ new Date()).toDateString();
  const todayCount = myRecords.filter(
    (r) => new Date(Number(r.timestamp) / 1e6).toDateString() === today
  ).length;
  const [modelId, setModelId] = reactExports.useState("");
  const [routeId, setRouteId] = reactExports.useState("");
  const [rangeStart, setRangeStart] = reactExports.useState("");
  const [rangeStop, setRangeStop] = reactExports.useState("");
  const [startSoc, setStartSoc] = reactExports.useState("");
  const [stopSoc, setStopSoc] = reactExports.useState("");
  const [topSpeed, setTopSpeed] = reactExports.useState("");
  const [avgSpeed, setAvgSpeed] = reactExports.useState("");
  const [issues, setIssues] = reactExports.useState([]);
  const [issueFlag, setIssueFlag] = reactExports.useState(IssueFlag.Other);
  const [issueDesc, setIssueDesc] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
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
  const removeIssue = (idx) => setIssues((prev) => prev.filter((_, i) => i !== idx));
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
    setDateOfRide((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    resetPhotos();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelId || !routeId) {
      ue.error("Please select a vehicle model and route");
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
        riderName: (profile == null ? void 0 : profile.name) ?? "Unknown",
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
      ue.success("Test data submitted successfully!");
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 3e3);
    } catch {
      ue.error("Failed to submit test data");
    }
  };
  const isPending = addRecord.isPending || uploading;
  const statsLoading = recordsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground truncate", children: [
          "Welcome back, ",
          (profile == null ? void 0 : profile.name) ?? "Rider",
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Submit your latest EV test session data below" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 shrink-0", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-24 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-24 rounded-lg" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: todayCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 border border-border px-4 py-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: myRecords.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" })
        ] })
      ] }) })
    ] }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Session submitted successfully!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-primary" }),
            " Session Details"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rider-date-of-ride", children: [
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
                  id: "rider-date-of-ride",
                  type: "date",
                  value: dateOfRide,
                  onChange: (e) => setDateOfRide(e.target.value),
                  className: "bg-input border-border",
                  "data-ocid": "rider-date-of-ride"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rider-model", children: [
                "Vehicle Model ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              modelsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: modelId, onValueChange: setModelId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "rider-model",
                    className: "bg-input border-border",
                    "data-ocid": "rider-model-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select vehicle model..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: m.id.toString(),
                    children: m.name
                  },
                  m.id.toString()
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rider-route", children: [
                "Test Route ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              routesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: routeId, onValueChange: setRouteId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "rider-route",
                    className: "bg-input border-border",
                    "data-ocid": "rider-route-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select test route..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: routes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SelectItem,
                  {
                    value: r.id.toString(),
                    children: [
                      r.name,
                      " — ",
                      r.distanceKm,
                      " km"
                    ]
                  },
                  r.id.toString()
                )) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { size: 15, className: "text-primary" }),
            " Performance Data"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-range-start", children: "Range Start (km)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-range-start",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: rangeStart,
                    onChange: (e) => setRangeStart(e.target.value),
                    placeholder: "e.g. 120.0",
                    className: "bg-input border-border",
                    "data-ocid": "rider-range-start"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-range-stop", children: "Range Stop (km)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-range-stop",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: rangeStop,
                    onChange: (e) => setRangeStop(e.target.value),
                    placeholder: "e.g. 95.0",
                    className: "bg-input border-border",
                    "data-ocid": "rider-range-stop"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-start-soc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "inline mr-1 text-accent" }),
                  "Start SOC (%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-start-soc",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    max: "100",
                    value: startSoc,
                    onChange: (e) => setStartSoc(e.target.value),
                    placeholder: "0 – 100",
                    className: "bg-input border-border",
                    "data-ocid": "rider-start-soc"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-stop-soc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "inline mr-1 text-accent" }),
                  "Stop SOC (%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-stop-soc",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    max: "100",
                    value: stopSoc,
                    onChange: (e) => setStopSoc(e.target.value),
                    placeholder: "0 – 100",
                    className: "bg-input border-border",
                    "data-ocid": "rider-stop-soc"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-top-speed", children: "Top Speed (km/h)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-top-speed",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: topSpeed,
                    onChange: (e) => setTopSpeed(e.target.value),
                    placeholder: "e.g. 72.5",
                    className: "bg-input border-border",
                    "data-ocid": "rider-top-speed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-avg-speed", children: "Avg Speed (km/h)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-avg-speed",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: avgSpeed,
                    onChange: (e) => setAvgSpeed(e.target.value),
                    placeholder: "e.g. 45.0",
                    className: "bg-input border-border",
                    "data-ocid": "rider-avg-speed"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 15, className: "text-primary" }),
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
                    "data-ocid": `rider-mode-${m.toLowerCase()}`,
                    children: m
                  },
                  m
                )
              ) })
            ] }),
            testingModeKey === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-custom-mode", children: [
                  "Custom Mode ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-custom-mode",
                    value: customMode,
                    onChange: (e) => setCustomMode(e.target.value),
                    placeholder: "e.g. Highway, Offroad...",
                    className: "bg-input border-border",
                    "data-ocid": "rider-custom-mode"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-custom-route", children: "Route (Manual Entry)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-custom-route",
                    value: customRouteText,
                    onChange: (e) => setCustomRouteText(e.target.value),
                    placeholder: "Describe the custom route...",
                    className: "bg-input border-border",
                    "data-ocid": "rider-custom-route"
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
                  "data-ocid": `rider-purpose-${key.toLowerCase()}`,
                  children: label
                },
                key
              )) })
            ] }),
            testPurposeKey === "Others" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-custom-purpose", children: [
                "Describe Purpose ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-custom-purpose",
                  value: customPurpose,
                  onChange: (e) => setCustomPurpose(e.target.value),
                  placeholder: "e.g. Motor stress test...",
                  className: "bg-input border-border",
                  "data-ocid": "rider-custom-purpose"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "text-primary" }),
            " Rider Information"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-rider-weight", children: [
                "Rider Weight (kg) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-rider-weight",
                  type: "number",
                  step: "0.1",
                  min: "30",
                  max: "200",
                  value: riderWeight,
                  onChange: (e) => setRiderWeight(e.target.value),
                  placeholder: "e.g. 72",
                  className: "bg-input border-border",
                  "data-ocid": "rider-weight"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-co-rider-weight", children: [
                "Co-rider Weight (kg)",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-co-rider-weight",
                  type: "number",
                  step: "0.1",
                  min: "30",
                  max: "200",
                  value: coRiderWeight,
                  onChange: (e) => setCoRiderWeight(e.target.value),
                  placeholder: "Leave blank if no co-rider",
                  className: "bg-input border-border",
                  "data-ocid": "rider-co-rider-weight"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 15, className: "text-destructive" }),
            " ",
            "Observed Issues",
            issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-auto bg-destructive/15 text-destructive border-destructive/30 font-mono text-xs", children: issues.length })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-col sm:flex-row items-start sm:items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full sm:w-44", children: [
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
                          "data-ocid": "rider-issue-flag",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FLAG_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 min-w-0 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-issue-desc", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "r-issue-desc",
                    value: issueDesc,
                    onChange: (e) => setIssueDesc(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addIssue();
                      }
                    },
                    placeholder: "Describe the issue observed...",
                    className: "bg-input border-border",
                    "data-ocid": "rider-issue-desc"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: addIssue,
                  disabled: !issueDesc.trim(),
                  className: "gap-1.5 shrink-0 w-full sm:w-auto",
                  "data-ocid": "rider-add-issue-btn",
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
                className: "flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2.5 gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs shrink-0 ${FLAG_COLORS[issue.flag]}`,
                        children: issue.flag
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: issue.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeIssue(idx),
                      className: "ml-1 p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0",
                      "aria-label": "Remove issue",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 })
                    }
                  )
                ]
              },
              `${issue.flag}-${idx}`
            )) }),
            issues.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No issues added — add any observations from the test session above" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 15, className: "text-primary" }),
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
              enableCamera: true,
              label: "Add session captures (max 5)",
              "data-ocid": "rider-photo-upload"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
          " Required fields"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: resetForm,
              className: "flex-1 sm:flex-none",
              "data-ocid": "rider-reset-btn",
              children: "Clear"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              size: "lg",
              disabled: isPending || !modelId || !routeId,
              "data-ocid": "rider-submit-btn",
              className: "gap-2 flex-1 sm:flex-none px-8",
              children: [
                isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SquareActivity, { size: 16 }),
                "Submit Test Data"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 17, className: "text-primary" }),
        "Recent Submissions"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k)) }) : myRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No sessions submitted yet. Fill in the form above to get started." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        myRecords.slice(0, 5).map((r) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3 gap-2",
              "data-ocid": `rider-recent-${r.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.vehicleModelName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    r.routeName,
                    " ·",
                    " ",
                    new Date(
                      Number(r.timestamp) / 1e6
                    ).toLocaleDateString(),
                    r.testingMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-primary", children: [
                      "·",
                      " ",
                      r.testingMode.__kind__ === "Other" ? r.testingMode.Other : r.testingMode.__kind__
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    r.rangeStartKm,
                    "→",
                    r.rangeStopKm,
                    " km"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
                    r.startSoc != null ? `↓${r.startSoc}%` : "",
                    r.startSoc != null && r.stopSoc != null ? "→" : "",
                    r.stopSoc != null ? `${r.stopSoc}%` : "",
                    r.startSoc == null && r.stopSoc == null ? "SOC —" : " SOC"
                  ] }),
                  r.issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-destructive", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
                    r.issues.length
                  ] }),
                  ((_a = r.photoUrls) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 11 }),
                    r.photoUrls.length
                  ] })
                ] })
              ]
            },
            r.id.toString()
          );
        }),
        myRecords.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center pt-1", children: [
          "Showing 5 of ",
          myRecords.length,
          " — view all in My Records"
        ] })
      ] }) })
    ] })
  ] });
}
export {
  RiderDashboard as default
};
