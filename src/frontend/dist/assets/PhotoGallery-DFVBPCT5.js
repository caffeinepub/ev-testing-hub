import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, n as reactDomExports, X, l as ChevronRight } from "./index-LhnIGNVd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function isValidUrl(url) {
  return url.startsWith("data:image/") || url.startsWith("data:application/octet-stream") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}
function normaliseUrl(url) {
  if (!url) return url;
  if (isValidUrl(url)) return url;
  if (/^[A-Za-z0-9+/=]{20,}$/.test(url)) {
    return `data:image/jpeg;base64,${url}`;
  }
  return url;
}
function PhotoGallery({ urls, maxVisible = 4 }) {
  const [lightboxIdx, setLightboxIdx] = reactExports.useState(null);
  const validUrls = (urls ?? []).map(normaliseUrl).filter(isValidUrl);
  const prevPhoto = reactExports.useCallback(() => {
    setLightboxIdx((i) => i !== null && i > 0 ? i - 1 : validUrls.length - 1);
  }, [validUrls.length]);
  const nextPhoto = reactExports.useCallback(() => {
    setLightboxIdx((i) => i !== null && i < validUrls.length - 1 ? i + 1 : 0);
  }, [validUrls.length]);
  reactExports.useEffect(() => {
    if (lightboxIdx === null) return;
    function handleKey(e) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: visible.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setLightboxIdx(idx),
        className: "relative group w-16 h-16 rounded-md overflow-hidden border border-border bg-muted/30 shrink-0 hover:border-primary transition-smooth",
        "aria-label": `View capture ${idx + 1}`,
        "data-ocid": `gallery-thumb-${idx}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: `Capture ${idx + 1}`,
              className: "w-full h-full object-cover",
              onError: (e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".img-fallback")) {
                  const fallback = document.createElement("div");
                  fallback.className = "img-fallback absolute inset-0 flex items-center justify-center text-xs bg-muted";
                  fallback.textContent = "📷";
                  parent.appendChild(fallback);
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ZoomIn,
            {
              size: 14,
              className: "text-background opacity-0 group-hover:opacity-100 transition-smooth"
            }
          ) }),
          idx === maxVisible - 1 && overflow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-background text-xs font-bold", children: [
            "+",
            overflow
          ] }) })
        ]
      },
      `thumb-${idx}`
    )) }),
    lightboxUrl !== null && lightboxIdx !== null && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
          "data-ocid": "photo-lightbox",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 bg-black/80",
                onClick: () => setLightboxIdx(null),
                onKeyDown: (e) => e.key === "Enter" && setLightboxIdx(null),
                role: "button",
                tabIndex: -1,
                "aria-label": "Close viewer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center max-w-3xl w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLightboxIdx(null),
                  className: "absolute -top-10 right-0 text-white/80 hover:text-white transition-colors",
                  "aria-label": "Close viewer",
                  "data-ocid": "lightbox-close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background rounded-xl overflow-hidden shadow-xl max-h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: lightboxUrl,
                  alt: `Capture ${lightboxIdx + 1} of ${validUrls.length}`,
                  className: "max-w-full max-h-[80vh] object-contain block"
                }
              ) }),
              validUrls.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: prevPhoto,
                    className: "bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors",
                    "aria-label": "Previous photo",
                    "data-ocid": "lightbox-prev",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80 text-sm", children: [
                  lightboxIdx + 1,
                  " / ",
                  validUrls.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: nextPhoto,
                    className: "bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors",
                    "aria-label": "Next photo",
                    "data-ocid": "lightbox-next",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20 })
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      document.body
    )
  ] });
}
export {
  PhotoGallery as P
};
