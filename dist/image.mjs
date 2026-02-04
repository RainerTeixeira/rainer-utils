// src/image/index.ts
function isAcceptedFormat(mimeType) {
  const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/avif"
  ];
  return acceptedTypes.includes(mimeType);
}
function isWebP(mimeType) {
  return mimeType === "image/webp";
}
function supportsWebP() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}
async function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
async function resizeImage(file, maxWidth, maxHeight, quality = 0.9, format = "image/jpeg") {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      let { width, height } = img;
      if (width > maxWidth) {
        height = maxWidth / width * height;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = maxHeight / height * width;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: format,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        format,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
async function convertToWebP(file, quality = 0.9) {
  if (isWebP(file.type)) {
    return file;
  }
  return resizeImage(file, file.size, file.size, quality, "image/webp");
}
async function prepareImageForUpload(file, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.9,
    shouldConvertToWebP = true,
    maxSizeBytes = 5 * 1024 * 1024
    // 5MB
  } = options;
  if (!isAcceptedFormat(file.type)) {
    throw new Error("Formato de imagem n\xE3o suportado");
  }
  if (file.size > maxSizeBytes) {
    throw new Error(`Arquivo muito grande. M\xE1ximo: ${maxSizeBytes / 1024 / 1024}MB`);
  }
  const info = await getImageInfo(file);
  let processedFile = file;
  if (info.width > maxWidth || info.height > maxHeight) {
    processedFile = await resizeImage(file, maxWidth, maxHeight, quality);
  }
  if (shouldConvertToWebP && !isWebP(processedFile.type)) {
    try {
      const isWebPSupported = await supportsWebP();
      if (isWebPSupported === true) {
        processedFile = await convertToWebP(processedFile, quality);
      }
    } catch {
    }
  }
  return processedFile;
}
function generatePlaceholder(width, height, text = "") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "rgb(229, 231, 235)";
  ctx.fillRect(0, 0, width, height);
  if (text) {
    ctx.fillStyle = "rgb(107, 114, 128)";
    ctx.font = `${Math.min(width, height) / 10}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
  }
  return canvas.toDataURL();
}

export { convertToWebP, generatePlaceholder, getImageInfo, isAcceptedFormat, isWebP, prepareImageForUpload, resizeImage, supportsWebP };
//# sourceMappingURL=image.mjs.map
//# sourceMappingURL=image.mjs.map