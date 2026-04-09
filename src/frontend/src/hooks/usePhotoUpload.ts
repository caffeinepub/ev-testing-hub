import { useCallback, useState } from "react";

export interface UploadedPhoto {
  file: File;
  previewUrl: string;
  dataUrl?: string;
}

const MAX_DIMENSION = 1200;
const JPEG_QUALITY = 0.85;

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height / width) * MAX_DIMENSION);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width / height) * MAX_DIMENSION);
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

export function usePhotoUpload(maxPhotos = 5) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addPhotos = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxPhotos - photos.length;
      const toAdd = fileArray.slice(0, remaining);

      const newPhotos: UploadedPhoto[] = toAdd.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    [photos.length, maxPhotos],
  );

  const removePhoto = useCallback((idx: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[idx].previewUrl);
      next.splice(idx, 1);
      return next;
    });
  }, []);

  const uploadAllPhotos = useCallback(async (): Promise<string[]> => {
    if (photos.length === 0) return [];

    const allReady = photos.every((p) => p.dataUrl);
    if (allReady) {
      return photos.map((p) => p.dataUrl as string);
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const results: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        if (photo.dataUrl) {
          results.push(photo.dataUrl);
        } else {
          const dataUrl = await fileToDataUrl(photo.file);
          results.push(dataUrl);
          setPhotos((prev) =>
            prev.map((p, idx) => (idx === i ? { ...p, dataUrl } : p)),
          );
        }
        setUploadProgress(Math.round(((i + 1) / photos.length) * 100));
      }
      return results;
    } finally {
      setUploading(false);
    }
  }, [photos]);

  const resetPhotos = useCallback(() => {
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
    canAddMore: photos.length < maxPhotos,
  };
}
