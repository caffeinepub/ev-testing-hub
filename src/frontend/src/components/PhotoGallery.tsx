import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PhotoGalleryProps {
  urls: string[];
  maxVisible?: number;
}

function isValidUrl(url: string): boolean {
  return (
    url.startsWith("data:image/") ||
    url.startsWith("data:application/octet-stream") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
}

/** Normalise a URL that might be raw base64 without the data: prefix */
function normaliseUrl(url: string): string {
  if (!url) return url;
  if (isValidUrl(url)) return url;
  // Looks like raw base64 — wrap it
  if (/^[A-Za-z0-9+/=]{20,}$/.test(url)) {
    return `data:image/jpeg;base64,${url}`;
  }
  return url;
}

export function PhotoGallery({ urls, maxVisible = 4 }: PhotoGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const validUrls = (urls ?? []).map(normaliseUrl).filter(isValidUrl);

  const prevPhoto = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : validUrls.length - 1));
  }, [validUrls.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i < validUrls.length - 1 ? i + 1 : 0));
  }, [validUrls.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, prevPhoto, nextPhoto]);

  if (validUrls.length === 0) return null;

  const visible = validUrls.slice(0, maxVisible);
  const overflow = validUrls.length - maxVisible;
  const lightboxUrl = lightboxIdx !== null ? validUrls[lightboxIdx] : null;

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {visible.map((url, idx) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: thumbnail order is stable
            key={`thumb-${idx}`}
            type="button"
            onClick={() => setLightboxIdx(idx)}
            className="relative group w-16 h-16 rounded-md overflow-hidden border border-border bg-muted/30 shrink-0 hover:border-primary transition-smooth"
            aria-label={`View capture ${idx + 1}`}
            data-ocid={`gallery-thumb-${idx}`}
          >
            <img
              src={url}
              alt={`Capture ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".img-fallback")) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "img-fallback absolute inset-0 flex items-center justify-center text-xs bg-muted";
                  fallback.textContent = "📷";
                  parent.appendChild(fallback);
                }
              }}
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

      {/* Lightbox — rendered via portal to escape any scroll/transform containers */}
      {lightboxUrl !== null &&
        lightboxIdx !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            data-ocid="photo-lightbox"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setLightboxIdx(null)}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(null)}
              role="button"
              tabIndex={-1}
              aria-label="Close viewer"
            />

            {/* Modal content */}
            <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
                aria-label="Close viewer"
                data-ocid="lightbox-close"
              >
                <X size={24} />
              </button>

              <div className="bg-background rounded-xl overflow-hidden shadow-xl max-h-[80vh] flex items-center justify-center">
                <img
                  src={lightboxUrl}
                  alt={`Capture ${lightboxIdx + 1} of ${validUrls.length}`}
                  className="max-w-full max-h-[80vh] object-contain block"
                />
              </div>

              {validUrls.length > 1 && (
                <div className="flex items-center gap-4 mt-3">
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                    aria-label="Previous photo"
                    data-ocid="lightbox-prev"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-white/80 text-sm">
                    {lightboxIdx + 1} / {validUrls.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                    aria-label="Next photo"
                    data-ocid="lightbox-next"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
