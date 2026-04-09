import { d as useRoutes, v as useAddRoute, w as useDeleteRoute, r as reactExports, j as jsxRuntimeExports, B as Button, S as Skeleton, M as MapPin, D as Dialog, o as DialogContent, p as DialogHeader, q as DialogTitle, L as Label, I as Input, s as DialogFooter, t as ue } from "./index--L95CfR1.js";
import { C as Card, d as CardContent, a as CardHeader } from "./card-CXHFdwVg.js";
import { T as Textarea } from "./textarea-BNK-WCD8.js";
import { P as Plus } from "./plus-cMgvVr22.js";
import { T as Trash2 } from "./trash-2-BVNZbHrJ.js";
import { L as LoaderCircle } from "./loader-circle-By20MbXa.js";
function AdminRoutes() {
  const { data: routes = [], isLoading } = useRoutes();
  const addRoute = useAddRoute();
  const deleteRoute = useDeleteRoute();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [distanceKm, setDistanceKm] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim() || !distanceKm) return;
    try {
      await addRoute.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        distanceKm: Number.parseFloat(distanceKm)
      });
      ue.success(`Route "${name}" added`);
      setName("");
      setDescription("");
      setDistanceKm("");
      setDialogOpen(false);
    } catch {
      ue.error("Failed to add route");
    }
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteRoute.mutateAsync(deleteTarget.id);
      ue.success(`Route "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete route");
    }
  };
  const totalDistance = routes.reduce((s, r) => s + r.distanceKm, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Test Routes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage testing routes used in EV field sessions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setDialogOpen(true),
          "data-ocid": "add-route-btn",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " New Route"
          ]
        }
      )
    ] }),
    !isLoading && routes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Routes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: routes.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Distance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: [
          totalDistance.toFixed(1),
          " km"
        ] })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-lg" }, k)) }) : routes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center",
        "data-ocid": "routes-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 40, className: "text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No routes configured" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add test routes to associate with field sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setDialogOpen(true), className: "mt-4 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Add Route"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: routes.map((route) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "data-card group",
        "data-ocid": `route-card-${route.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground truncate", children: route.name }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth",
                onClick: () => setDeleteTarget(route),
                "data-ocid": `delete-route-${route.id}`,
                "aria-label": `Delete ${route.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            route.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: route.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Distance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                route.distanceKm,
                " km"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Added",
              " ",
              new Date(
                Number(route.createdAt) / 1e6
              ).toLocaleDateString()
            ] })
          ] })
        ]
      },
      route.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }),
        " Add Test Route"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "route-name", children: "Route Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "route-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. City Loop — Sector 7",
              className: "bg-input border-border",
              "data-ocid": "route-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "route-desc", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "route-desc",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "Describe terrain, road conditions, notable landmarks...",
              className: "bg-input border-border resize-none",
              rows: 3,
              "data-ocid": "route-desc-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "route-dist", children: "Distance (km) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "route-dist",
              type: "number",
              step: "0.1",
              min: "0",
              value: distanceKm,
              onChange: (e) => setDistanceKm(e.target.value),
              placeholder: "e.g. 25.5",
              className: "bg-input border-border",
              "data-ocid": "route-dist-input"
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
              disabled: addRoute.isPending || !name.trim() || !distanceKm,
              "data-ocid": "route-submit-btn",
              children: [
                addRoute.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                "Add Route"
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
            "Are you sure you want to delete route",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              '"',
              deleteTarget == null ? void 0 : deleteTarget.name,
              '"'
            ] }),
            "? Associated test records will lose their route reference."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDeleteTarget(null), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                onClick: confirmDelete,
                disabled: deleteRoute.isPending,
                "data-ocid": "confirm-delete-route-btn",
                children: [
                  deleteRoute.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-2 animate-spin" }),
                  "Delete Route"
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
  AdminRoutes as default
};
