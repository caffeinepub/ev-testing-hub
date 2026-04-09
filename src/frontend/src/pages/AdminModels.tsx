import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Car, Loader2, Plus, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VehicleType } from "../backend";
import type { VehicleModel } from "../backend";
import {
  useAddVehicleModel,
  useDeleteVehicleModel,
  useVehicleModels,
} from "../hooks/useBackend";

export default function AdminModels() {
  const { data: models = [], isLoading } = useVehicleModels();
  const addModel = useAddVehicleModel();
  const deleteModel = useDeleteVehicleModel();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.TwoWheeler,
  );
  const [specs, setSpecs] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<VehicleModel | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addModel.mutateAsync({
        name: name.trim(),
        vehicleType,
        specs: specs.trim(),
      });
      toast.success(`Model "${name}" added successfully`);
      setName("");
      setSpecs("");
      setVehicleType(VehicleType.TwoWheeler);
      setDialogOpen(false);
    } catch {
      toast.error("Failed to add model");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteModel.mutateAsync(deleteTarget.id);
      toast.success(`Model "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete model");
    }
  };

  const twoWheelers = models.filter(
    (m) => m.vehicleType === VehicleType.TwoWheeler,
  );
  const threeWheelers = models.filter(
    (m) => m.vehicleType === VehicleType.ThreeWheeler,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Vehicle Models
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage 2-wheeler and 3-wheeler test fleet models
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="add-model-btn"
          className="gap-2"
        >
          <Plus size={16} /> New Model
        </Button>
      </div>

      {/* Summary */}
      {!isLoading && models.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">2-Wheelers</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {twoWheelers.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">3-Wheelers</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {threeWheelers.length}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-40 rounded-lg" />
          ))}
        </div>
      ) : models.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center"
          data-ocid="models-empty-state"
        >
          <Car size={40} className="text-muted-foreground mb-4" />
          <p className="font-medium text-foreground">No vehicle models yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first EV model to begin testing
          </p>
          <Button onClick={() => setDialogOpen(true)} className="mt-4 gap-2">
            <Plus size={16} /> Add Model
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <Card
              key={model.id.toString()}
              className="data-card group"
              data-ocid={`model-card-${model.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <Car size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-display font-semibold text-foreground truncate">
                        {model.name}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-xs ${
                      model.vehicleType === VehicleType.TwoWheeler
                        ? "border-primary/30 text-primary bg-primary/10"
                        : "border-accent/30 text-accent bg-accent/10"
                    }`}
                  >
                    {model.vehicleType === VehicleType.TwoWheeler
                      ? "2-Wheeler"
                      : "3-Wheeler"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {model.specs && (
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {model.specs}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    Added{" "}
                    {new Date(
                      Number(model.createdAt) / 1_000_000,
                    ).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive transition-smooth"
                    onClick={() => setDeleteTarget(model)}
                    data-ocid={`delete-model-${model.id}`}
                    aria-label={`Delete ${model.name}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
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
              <Zap size={18} className="text-primary" /> Add Vehicle Model
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-name">Model Name *</Label>
              <Input
                id="model-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. EV-101 Alpha"
                className="bg-input border-border"
                data-ocid="model-name-input"
              />
            </div>
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select
                value={vehicleType}
                onValueChange={(v) => setVehicleType(v as VehicleType)}
              >
                <SelectTrigger
                  className="bg-input border-border"
                  data-ocid="model-type-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={VehicleType.TwoWheeler}>
                    2-Wheeler (Electric Bike / Scooter)
                  </SelectItem>
                  <SelectItem value={VehicleType.ThreeWheeler}>
                    3-Wheeler (Auto / E-Rickshaw)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model-specs">Technical Specifications</Label>
              <Textarea
                id="model-specs"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="e.g. 72V 40Ah, BLDC 3kW motor, top speed 65 km/h, range 120 km"
                className="bg-input border-border resize-none"
                rows={3}
                data-ocid="model-specs-input"
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
                disabled={addModel.isPending || !name.trim()}
                data-ocid="model-submit-btn"
              >
                {addModel.isPending && (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                )}
                Add Model
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
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{deleteTarget?.name}"
            </span>
            ? This action cannot be undone and will affect associated test
            records.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteModel.isPending}
              data-ocid="confirm-delete-model-btn"
            >
              {deleteModel.isPending && (
                <Loader2 size={14} className="mr-2 animate-spin" />
              )}
              Delete Model
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
