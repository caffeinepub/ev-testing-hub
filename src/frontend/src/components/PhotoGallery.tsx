import { X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface PhotoGalleryProps {
  urls: string[];
  maxVisible?: number;
}

export function PhotoGallery({ urls, maxVisible = 4 }: PhotoGalleryProps) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  if (!urls || urls.length === 0) return null;

  const visible = urls.slice(0, maxVisible);
  const overflow = urls.length - maxVisible;

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {visible.map((url, idx) => (
          <button
            key={`gallery-${url}`}
            type="button"
            onClick={() => setLightboxUrl(url)}
            className="relative group w-16 h-16 rounded-md overflow-hidden border border-border bg-muted/30 shrink-0 hover:border-primary transition-smooth"
            aria-label="View full size"
            data-ocid={`gallery-thumb-${idx}`}
          >
            <img
              src={url}
              alt={`Test session capture ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-smooth flex items-center justify-center">
              <ZoomIn
                size={14}
                className="text-background opacity-0 group-hover:opacity-100 transition-smooth"
              />
            </div>
            {idx === maxVisible - 1 && overflow > 0 && (
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                <span className="text-background text-xs font-bold">
                  +{overflow}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <dialog
          className="fixed inset-0 z-50 m-0 max-w-none max-h-none w-full h-full bg-transparent border-none p-4 flex items-center justify-center"
          open
          onKeyDown={(e) => e.key === "Escape" && setLightboxUrl(null)}
          data-ocid="photo-lightbox"
        >
          <div
            className="absolute inset-0 bg-foreground/80"
            onClick={() => setLightboxUrl(null)}
            onKeyDown={() => {}}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl max-h-[90vh] bg-background rounded-xl overflow-hidden shadow-xl">
            <button
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-muted rounded-full p-1.5 transition-smooth"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img
              src={lightboxUrl}
              alt="Full size view"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </dialog>
      )}
    </>
  );
}
