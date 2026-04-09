import { r as reactExports, j as jsxRuntimeExports, P as Primitive, Q as cn, b as useVehicleModels, d as useRoutes, w as useAdminCreateTestRecord, B as Button, R as Upload, X, s as ue, x as IssueFlag } from "./index-CvDcA4vm.js";
import { B as Badge } from "./badge-BsUQqHHD.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DAQ316_z.js";
import { read as readSync, utils, writeFile as writeFileSync } from "./xlsx-sHbfT3iK.js";
import { D as Download, F as FileSpreadsheet } from "./file-spreadsheet-DVwPKdHd.js";
import { C as CircleCheck } from "./circle-check-BRZKw1Kj.js";
import { C as CircleAlert } from "./circle-alert-B8n25wSl.js";
import { L as LoaderCircle } from "./loader-circle-BksO7P1b.js";
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
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
  "Issues (semicolon-separated)"
];
function downloadTemplate() {
  const wb = utils.book_new();
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
      "Battery drain;Tyre wear"
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
      "Brake noise"
    ]
  ];
  const ws = utils.aoa_to_sheet(rows);
  ws["!cols"] = HEADERS.map((h) => ({ wch: Math.max(h.length + 4, 18) }));
  utils.book_append_sheet(wb, ws, "EV Test Data");
  writeFileSync(wb, "EV_Test_Import_Template.xlsx");
  ue.success("Template downloaded — fill it in and upload it here.");
}
function parseTestingMode(val, customMode) {
  const v = val.trim().toLowerCase();
  if (v === "eco") return { __kind__: "Eco", Eco: null };
  if (v === "city") return { __kind__: "City", City: null };
  if (v === "sport") return { __kind__: "Sport", Sport: null };
  if (v === "other") return { __kind__: "Other", Other: customMode.trim() };
  return null;
}
function parseTestPurpose(val, customPurpose) {
  const v = val.trim().toLowerCase();
  if (v === "range") return { __kind__: "Range", Range: null };
  if (v === "durability") return { __kind__: "Durability", Durability: null };
  if (v === "component test")
    return { __kind__: "ComponentTest", ComponentTest: null };
  if (v === "others")
    return { __kind__: "Others", Others: customPurpose.trim() };
  return null;
}
function parseIssues(val) {
  if (!val || !val.trim()) return [];
  return val.split(";").map((s) => s.trim()).filter(Boolean).map((desc) => ({ flag: IssueFlag.Other, description: desc }));
}
function validateRow(raw, rowNum, models, routes) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const base = { rowNum, valid: false, raw };
  const modelName = ((_a = raw["Vehicle Model Name"]) == null ? void 0 : _a.trim()) ?? "";
  const routeName = ((_b = raw["Route Name"]) == null ? void 0 : _b.trim()) ?? "";
  const riderName = ((_c = raw["Rider Name"]) == null ? void 0 : _c.trim()) ?? "";
  if (!modelName) return { ...base, error: "Vehicle Model Name is required" };
  if (!routeName) return { ...base, error: "Route Name is required" };
  if (!riderName) return { ...base, error: "Rider Name is required" };
  const model = models.find(
    (m) => m.name.toLowerCase() === modelName.toLowerCase()
  );
  if (!model)
    return { ...base, error: `Vehicle model "${modelName}" not found` };
  const route = routes.find(
    (r) => r.name.toLowerCase() === routeName.toLowerCase()
  );
  if (!route) return { ...base, error: `Route "${routeName}" not found` };
  const testingModeRaw = ((_d = raw["Testing Mode"]) == null ? void 0 : _d.trim()) ?? "";
  const customMode = ((_e = raw["Custom Mode (if Other)"]) == null ? void 0 : _e.trim()) ?? "";
  if (!testingModeRaw) return { ...base, error: "Testing Mode is required" };
  if (testingModeRaw.toLowerCase() === "other" && !customMode) {
    return {
      ...base,
      error: "Custom Mode required when Testing Mode is Other"
    };
  }
  const testingMode = parseTestingMode(testingModeRaw, customMode);
  if (!testingMode)
    return {
      ...base,
      error: `Invalid Testing Mode: "${testingModeRaw}" (use Eco, City, Sport, or Other)`
    };
  const testPurposeRaw = ((_f = raw["Test Purpose"]) == null ? void 0 : _f.trim()) ?? "";
  const customPurpose = ((_g = raw["Custom Test Purpose (if Others)"]) == null ? void 0 : _g.trim()) ?? "";
  if (!testPurposeRaw) return { ...base, error: "Test Purpose is required" };
  if (testPurposeRaw.toLowerCase() === "others" && !customPurpose) {
    return {
      ...base,
      error: "Custom Test Purpose required when Test Purpose is Others"
    };
  }
  const testPurpose = parseTestPurpose(testPurposeRaw, customPurpose);
  if (!testPurpose)
    return {
      ...base,
      error: `Invalid Test Purpose: "${testPurposeRaw}" (use Range, Durability, Component Test, or Others)`
    };
  const rangeStartKm = Number.parseFloat(raw["Start KM"] ?? "0") || 0;
  const rangeStopKm = Number.parseFloat(raw["Stop KM"] ?? "0") || 0;
  const startSoc = raw["Start SOC (%)"] ? Number.parseFloat(raw["Start SOC (%)"]) : null;
  const stopSoc = raw["Stop SOC (%)"] ? Number.parseFloat(raw["Stop SOC (%)"]) : null;
  const topSpeedKmh = Number.parseFloat(raw["Top Speed (km/h)"] ?? "0") || 0;
  const avgSpeedKmh = Number.parseFloat(raw["Average Speed (km/h)"] ?? "0") || 0;
  const riderWeight = raw["Rider Weight (kg)"] ? Number.parseFloat(raw["Rider Weight (kg)"]) : null;
  const coRiderWeight = raw["Co-rider Weight (kg)"] ? Number.parseFloat(raw["Co-rider Weight (kg)"]) : null;
  const customRoute = ((_h = raw["Custom Route (if Other mode)"]) == null ? void 0 : _h.trim()) || null;
  const dateRawVal = (raw.Date ?? "").trim();
  const parsedDate = dateRawVal ? new Date(dateRawVal).getTime() : Number.NaN;
  const dateOfRide = Number.isNaN(parsedDate) ? void 0 : parsedDate;
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
      dateOfRide
    }
  };
}
function PreviewRow({ row }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: `border-b border-border text-sm ${row.valid ? "" : "bg-destructive/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-center text-muted-foreground", children: row.rowNum }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: row.valid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-green-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
          " Valid"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14 }),
          " Error"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 truncate max-w-[160px]", children: row.raw["Vehicle Model Name"] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 truncate max-w-[140px]", children: row.raw["Route Name"] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: row.raw["Rider Name"] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: row.raw["Testing Mode"] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: row.raw["Test Purpose"] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-destructive text-xs", children: row.error ?? "" })
      ]
    }
  );
}
function AdminImport() {
  const { data: models = [] } = useVehicleModels();
  const { data: routes = [] } = useRoutes();
  const createRecord = useAdminCreateTestRecord();
  const fileInputRef = reactExports.useRef(null);
  const [fileName, setFileName] = reactExports.useState(null);
  const [parsedRows, setParsedRows] = reactExports.useState([]);
  const [importing, setImporting] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [summary, setSummary] = reactExports.useState(null);
  const validRows = parsedRows.filter((r) => r.valid);
  const invalidRows = parsedRows.filter((r) => !r.valid);
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setFileName(file.name);
    setSummary(null);
    setParsedRows([]);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      try {
        const data = new Uint8Array((_a2 = ev.target) == null ? void 0 : _a2.result);
        const wb = readSync(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = utils.sheet_to_json(ws, {
          defval: "",
          raw: false
        });
        if (rows.length === 0) {
          ue.error("The Excel file appears to be empty.");
          return;
        }
        const parsed = rows.map(
          (row, idx) => validateRow(row, idx + 2, models, routes)
        );
        setParsedRows(parsed);
        const valid = parsed.filter((r) => r.valid).length;
        ue.info(
          `Parsed ${parsed.length} rows — ${valid} valid, ${parsed.length - valid} with errors.`
        );
      } catch {
        ue.error(
          "Failed to parse the Excel file. Make sure it's a valid .xlsx file."
        );
      }
    };
    reader.readAsArrayBuffer(file);
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
          photoUrls: []
        });
        imported++;
      } catch {
        errors++;
      }
      setProgress(Math.round((i + 1) / validRows.length * 100));
    }
    setImporting(false);
    setSummary({ imported, errors });
    if (errors === 0) {
      ue.success(`${imported} records imported successfully!`);
    } else {
      ue.warning(
        `Import complete: ${imported} succeeded, ${errors} failed.`
      );
    }
  };
  const handleReset = () => {
    setParsedRows([]);
    setFileName(null);
    setSummary(null);
    setProgress(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Import Data from Excel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Admin only — bulk import test records from an Excel spreadsheet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 shrink-0",
          onClick: downloadTemplate,
          "data-ocid": "import-download-template",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
            "Download Sample Template"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 18, className: "text-primary" }),
        "Upload Excel File"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 py-10 cursor-pointer hover:bg-muted/50 hover:border-primary/40 transition-colors",
            "data-ocid": "import-file-drop",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 22, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: fileName ? fileName : "Click to select an Excel file" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Accepts .xlsx files only. Use the template above for the correct format." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: ".xlsx",
            className: "hidden",
            onChange: handleFileChange,
            "data-ocid": "import-file-input"
          }
        ),
        parsedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-green-700 border-green-300 bg-green-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "mr-1" }),
                validRows.length,
                " valid"
              ]
            }
          ),
          invalidRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-destructive border-destructive/30 bg-destructive/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "mr-1" }),
                invalidRows.length,
                " with errors"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleReset,
              className: "ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
                " Clear"
              ]
            }
          )
        ] })
      ] })
    ] }),
    parsedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base", children: [
        "Preview — ",
        parsedRows.length,
        " Rows"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full min-w-[700px] text-sm",
          "data-ocid": "import-preview-table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground w-12", children: "Row" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-24", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Vehicle Model" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Route" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Rider" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Purpose" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground", children: "Error" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: parsedRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewRow, { row }, row.rowNum)) })
          ]
        }
      ) }) })
    ] }),
    parsedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
      importing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Importing records…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Progress,
          {
            value: progress,
            className: "h-2",
            "data-ocid": "import-progress"
          }
        )
      ] }),
      summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${summary.errors === 0 ? "border-green-300 bg-green-50 text-green-800" : "border-amber-300 bg-amber-50 text-amber-800"}`,
          "data-ocid": "import-summary",
          children: [
            summary.errors === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16, className: "shrink-0 text-green-700" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "shrink-0 text-amber-700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Import complete:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                summary.imported,
                " records imported"
              ] }),
              summary.errors > 0 && `, ${summary.errors} failed`,
              "."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: validRows.length > 0 ? `Ready to import ${validRows.length} valid row${validRows.length !== 1 ? "s" : ""}.${invalidRows.length > 0 ? ` ${invalidRows.length} row${invalidRows.length !== 1 ? "s" : ""} will be skipped.` : ""}` : "No valid rows to import. Fix errors in the file and re-upload." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleImport,
            disabled: importing || validRows.length === 0,
            className: "gap-2",
            "data-ocid": "import-submit-btn",
            children: importing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }),
              "Importing…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 15 }),
              "Import All Valid Rows"
            ] })
          }
        )
      ] })
    ] }) }),
    parsedRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/30 border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-sm text-muted-foreground", children: "How to use Excel Import" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Download Sample Template" }),
          " ",
          "above to get the correct Excel format."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Fill in your test data. Vehicle Model Name and Route Name must match exactly what is configured in the system." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "For ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Testing Mode" }),
          " ",
          "use: Eco, City, Sport, or Other (fill Custom Mode if Other)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "For ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Test Purpose" }),
          " ",
          "use: Range, Durability, Component Test, or Others (fill Custom Purpose if Others)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "For ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Issues" }),
          " separate multiple items with a semicolon, e.g.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 rounded", children: "Battery drain;Brake noise" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Upload the filled file. Review the preview table, then click",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Import All Valid Rows" }),
          "."
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminImport as default
};
