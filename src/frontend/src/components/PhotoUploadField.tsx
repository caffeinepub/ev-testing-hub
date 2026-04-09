import { Button } from "@/components/ui/button";
import { Camera, ImagePlus, Loader2, X } from "lucide-react";
import type { UploadedPhoto } from "../hooks/usePhotoUpload";

interface PhotoUploadFieldProps {
  photos: UploadedPhoto[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (idx: number) => void;
  canAddMore: boolean;
  uploading?: boolean;
  uploadProgress?: number;
  enableCamera?: boolean;
  label?: string;
  maxPhotos?: number;
}

export function PhotoUploadField({
  photos,
  onAdd,
  onRemove,
  canAddMore,
  uploading = false,
  uploadProgress = 0,
  enableCamera = false,
  label = "Photos",
  maxPhotos = 5,
}: PhotoUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onAdd(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          {photos.length} / {maxPhotos} photos
        </span>
      </div>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, idx) => (
            <div
              key={`photo-${photo.previewUrl}-${idx}`}
              className="relative group w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted/30 shrink-0"
              data-ocid={`photo-thumb-${idx}`}
            >
              <img
                src={photo.previewUrl}
                alt={`Session capture ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {photo.dataUrl && (
                <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-accent" />
              )}
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute top-0.5 right-0.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-smooth"
                aria-label="Remove photo"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 size={12} className="animate-spin text-primary" />
          <span>Uploading photos... {uploadProgress}%</span>
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Add buttons */}
      {canAddMore && !uploading && (
        <div className="flex gap-2 flex-wrap">
          <label className="cursor-pointer" data-ocid="photo-upload-btn">
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 pointer-events-none"
              asChild
            >
              <span>
                <ImagePlus size={14} />
                Add Photos
              </span>
            </Button>
          </label>
          {enableCamera && (
            <label className="cursor-pointer" data-ocid="camera-capture-btn">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 pointer-events-none"
                asChild
              >
                <span>
                  <Camera size={14} />
                  Camera
                </span>
              </Button>
            </label>
          )}
        </div>
      )}

      {photos.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No photos — add up to 5 photos from the test session
        </p>
      )}
    </div>
  );
}
