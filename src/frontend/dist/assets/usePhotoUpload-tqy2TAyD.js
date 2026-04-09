import { c as createLucideIcon, j as jsxRuntimeExports, X, B as Button, r as reactExports } from "./index-CvDcA4vm.js";
import { L as LoaderCircle } from "./loader-circle-BksO7P1b.js";
import { C as Camera } from "./camera-DJUyW5yx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
function PhotoUploadField({
  photos,
  onAdd,
  onRemove,
  canAddMore,
  uploading = false,
  uploadProgress = 0,
  enableCamera = false,
  label = "Photos",
  maxPhotos = 5
}) {
  const handleFileChange = (e) => {
    var _a;
    if ((_a = e.target.files) == null ? void 0 : _a.length) {
      onAdd(e.target.files);
      e.target.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        photos.length,
        " / ",
        maxPhotos,
        " photos"
      ] })
    ] }),
    photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: photos.map((photo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative group w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted/30 shrink-0",
        "data-ocid": `photo-thumb-${idx}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photo.previewUrl,
              alt: `Session capture ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          ),
          photo.dataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRemove(idx),
              className: "absolute top-0.5 right-0.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-smooth",
              "aria-label": "Remove photo",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
            }
          )
        ]
      },
      `photo-${photo.previewUrl}-${idx}`
    )) }),
    uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Uploading photos... ",
        uploadProgress,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary transition-all duration-300",
          style: { width: `${uploadProgress}%` }
        }
      ) })
    ] }),
    canAddMore && !uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", "data-ocid": "photo-upload-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            multiple: true,
            className: "sr-only",
            onChange: handleFileChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5 pointer-events-none",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 14 }),
              "Add Photos"
            ] })
          }
        )
      ] }),
      enableCamera && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", "data-ocid": "camera-capture-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            capture: "environment",
            className: "sr-only",
            onChange: handleFileChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5 pointer-events-none",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 }),
              "Camera"
            ] })
          }
        )
      ] })
    ] }),
    photos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No photos — add up to 5 photos from the test session" })
  ] });
}
const MAX_DIMENSION = 1200;
const JPEG_QUALITY = 0.85;
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round(height / width * MAX_DIMENSION);
          width = MAX_DIMENSION;
        } else {
          width = Math.round(width / height * MAX_DIMENSION);
          height = MAX_DIMENSION;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}
function usePhotoUpload(maxPhotos = 5) {
  const [photos, setPhotos] = reactExports.useState([]);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const addPhotos = reactExports.useCallback(
    (files) => {
      const fileArray = Array.from(files);
      const remaining = maxPhotos - photos.length;
      const toAdd = fileArray.slice(0, remaining);
      const newPhotos = toAdd.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file)
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    [photos.length, maxPhotos]
  );
  const removePhoto = reactExports.useCallback((idx) => {
    setPhotos((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[idx].previewUrl);
      next.splice(idx, 1);
      return next;
    });
  }, []);
  const uploadAllPhotos = reactExports.useCallback(async () => {
    if (photos.length === 0) return [];
    const allReady = photos.every((p) => p.dataUrl);
    if (allReady) {
      return photos.map((p) => p.dataUrl);
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const results = [];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        if (photo.dataUrl) {
          results.push(photo.dataUrl);
        } else {
          const dataUrl = await fileToDataUrl(photo.file);
          results.push(dataUrl);
          setPhotos(
            (prev) => prev.map((p, idx) => idx === i ? { ...p, dataUrl } : p)
          );
        }
        setUploadProgress(Math.round((i + 1) / photos.length * 100));
      }
      return results;
    } finally {
      setUploading(false);
    }
  }, [photos]);
  const resetPhotos = reactExports.useCallback(() => {
    for (const p of photos) URL.revokeObjectURL(p.previewUrl);
    setPhotos([]);
    setUploadProgress(0);
  }, [photos]);
  return {
    photos,
    uploading,
    uploadProgress,
    addPhotos,
    removePhoto,
    uploadAllPhotos,
    resetPhotos,
    canAddMore: photos.length < maxPhotos
  };
}
export {
  CalendarDays as C,
  PhotoUploadField as P,
  Settings2 as S,
  usePhotoUpload as u
};
