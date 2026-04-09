import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Route } from "../backend";
import { useAddRoute, useDeleteRoute, useRoutes } from "../hooks/useBackend";

export default function AdminRoutes() {
  const { data: routes = [], isLoading } = useRoutes();
  const addRoute = useAddRoute();
  const deleteRoute = useDeleteRoute();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Route | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !distanceKm) return;
    try {
      await addRoute.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        distanceKm: Number.parseFloat(distanceKm),
      });
      toast.success(`Route "${name}" added`);
      setName("");
      setDescription("");
      setDistanceKm("");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to add route");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteRoute.mutateAsync(deleteTarget.id);
      toast.success(`Route "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete route");
    }
  };

  const totalDistance = routes.reduce((s, r) => s + r.distanceKm, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Test Routes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage testing routes used in EV field sessions
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="add-route-btn"
          className="gap-2"
        >
          <Plus size={16} /> New Route
        </Button>
      </div>

      {/* Summary */}
      {!isLoading && routes.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Routes</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {routes.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Distance</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {totalDistance.toFixed(1)} km
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : routes.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center"
          data-ocid="routes-empty-state"
        >
          <MapPin size={40} className="text-muted-foreground mb-4" />
          <p className="font-medium text-foreground">No routes configured</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add test routes to associate with field sessions
          </p>
          <Button onClick={() => setDialogOpen(true)} className="mt-4 gap-2">
            <Plus size={16} /> Add Route
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Card
              key={route.id.toString()}
              className="data-card group"
              data-ocid={`route-card-${route.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-display font-semibold text-foreground truncate">
                        {route.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                    onClick={() => setDeleteTarget(route)}
                    data-ocid={`delete-route-${route.id}`}
                    aria-label={`Delete ${route.name}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {route.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {route.description}
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="text-xs text-muted-foreground">
                    Distance
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {route.distanceKm} km
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Added{" "}
                  {new Date(
                    Number(route.createdAt) / 1_000_000,
                  ).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> Add Test Route
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="route-name">Route Name *</Label>
              <Input
                id="route-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. City Loop — Sector 7"
                className="bg-input border-border"
                data-ocid="route-name-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="route-desc">Description</Label>
              <Textarea
                id="route-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe terrain, road conditions, notable landmarks..."
                className="bg-input border-border resize-none"
                rows={3}
                data-ocid="route-desc-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="route-dist">Distance (km) *</Label>
              <Input
                id="route-dist"
                type="number"
                step="0.1"
                min="0"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                placeholder="e.g. 25.5"
                className="bg-input border-border"
                data-ocid="route-dist-input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addRoute.isPending || !name.trim() || !distanceKm}
                data-ocid="route-submit-btn"
              >
                {addRoute.isPending && (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                )}
                Add Route
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive flex items-center gap-2">
              <Trash2 size={18} /> Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete route{" "}
            <span className="font-semibold text-foreground">
              "{deleteTarget?.name}"
            </span>
            ? Associated test records will lose their route reference.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteRoute.isPending}
              data-ocid="confirm-delete-route-btn"
            >
              {deleteRoute.isPending && (
                <Loader2 size={14} className="mr-2 animate-spin" />
              )}
              Delete Route
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
