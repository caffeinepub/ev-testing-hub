import { b as useVehicleModels, p as useAddVehicleModel, q as useDeleteVehicleModel, r as reactExports, V as VehicleType, j as jsxRuntimeExports, B as Button, S as Skeleton, k as Car, D as Dialog, s as DialogContent, t as DialogHeader, v as DialogTitle, Z as Zap, L as Label, I as Input, w as DialogFooter, x as ue } from "./index-LhnIGNVd.js";
import { B as Badge } from "./badge-C6aQCMFb.js";
import { C as Card, d as CardContent, a as CardHeader } from "./card-BcTxOoEl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D-RGOwUB.js";
import { T as Textarea } from "./textarea-B-cJ5dVn.js";
import { P as Plus } from "./plus-D3wdBEbq.js";
import { T as Trash2 } from "./trash-2-CyJKbKRs.js";
import { L as LoaderCircle } from "./loader-circle-Bs6ySCyt.js";
function AdminModels() {
  const { data: models = [], isLoading } = useVehicleModels();
  const addModel = useAddVehicleModel();
  const deleteModel = useDeleteVehicleModel();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [vehicleType, setVehicleType] = reactExports.useState(
    VehicleType.TwoWheeler
  );
  const [specs, setSpecs] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addModel.mutateAsync({
        name: name.trim(),
        vehicleType,
        specs: specs.trim()
      });
      ue.success(`Model "${name}" added successfully`);
      setName("");
      setSpecs("");
      setVehicleType(VehicleType.TwoWheeler);
      setDialogOpen(false);
    } catch {
      ue.error("Failed to add model");
    }
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteModel.mutateAsync(deleteTarget.id);
      ue.success(`Model "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete model");
    }
  };
  const twoWheelers = models.filter(
    (m) => m.vehicleType === VehicleType.TwoWheeler
  );
  const threeWheelers = models.filter(
    (m) => m.vehicleType === VehicleType.ThreeWheeler
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Vehicle Models" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage 2-wheeler and 3-wheeler test fleet models" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setDialogOpen(true),
          "data-ocid": "add-model-btn",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " New Model"
          ]
        }
      )
    ] }),
    !isLoading && models.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "2-Wheelers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: twoWheelers.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "3-Wheelers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: threeWheelers.length })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-lg" }, k)) }) : models.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center",
        "data-ocid": "models-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 40, className: "text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No vehicle models yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add your first EV model to begin testing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setDialogOpen(true), className: "mt-4 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Add Model"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: models.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "data-card group",
        "data-ocid": `model-card-${model.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground truncate", children: model.name }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `shrink-0 text-xs ${model.vehicleType === VehicleType.TwoWheeler ? "border-primary/30 text-primary bg-primary/10" : "border-accent/30 text-accent bg-accent/10"}`,
                children: model.vehicleType === VehicleType.TwoWheeler ? "2-Wheeler" : "3-Wheeler"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            model.specs && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3 leading-relaxed", children: model.specs }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Added",
                " ",
                new Date(
                  Number(model.createdAt) / 1e6
                ).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive transition-smooth",
                  onClick: () => setDeleteTarget(model),
                  "data-ocid": `delete-model-${model.id}`,
                  "aria-label": `Delete ${model.name}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                }
              )
            ] })
          ] })
        ]
      },
      model.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, className: "text-primary" }),
        " Add Vehicle Model"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "model-name", children: "Model Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "model-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. EV-101 Alpha",
              className: "bg-input border-border",
              "data-ocid": "model-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: vehicleType,
              onValueChange: (v) => setVehicleType(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-input border-border",
                    "data-ocid": "model-type-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: VehicleType.TwoWheeler, children: "2-Wheeler (Electric Bike / Scooter)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: VehicleType.ThreeWheeler, children: "3-Wheeler (Auto / E-Rickshaw)" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "model-specs", children: "Technical Specifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "model-specs",
              value: specs,
              onChange: (e) => setSpecs(e.target.value),
              placeholder: "e.g. 72V 40Ah, BLDC 3kW motor, top speed 65 km/h, range 120 km",
              className: "bg-input border-border resize-none",
              rows: 3,
              "data-ocid": "model-specs-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: addModel.isPending || !name.trim(),
              "data-ocid": "model-submit-btn",
              children: [
                addModel.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                "Add Model"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }),
            " Confirm Delete"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              '"',
              deleteTarget == null ? void 0 : deleteTarget.name,
              '"'
            ] }),
            "? This action cannot be undone and will affect associated test records."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDeleteTarget(null), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                onClick: confirmDelete,
                disabled: deleteModel.isPending,
                "data-ocid": "confirm-delete-model-btn",
                children: [
                  deleteModel.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                  "Delete Model"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminModels as default
};
