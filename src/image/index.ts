/**
 * Image Utilities
 *
 * Utilitários universais para processamento e otimização de imagens.
 *
 * @module @rainersoft/ui/lib/image-utils
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Verifica se formato de imagem é aceito
 *
 * @param mimeType - MIME type da imagem
 * @returns True se formato for aceito
 *
 * @example
 * ```ts
 * isAcceptedFormat('image/jpeg') // true
 * isAcceptedFormat('image/svg+xml') // false
 * ```
 */
export function isAcceptedFormat(mimeType: string): boolean {
  const acceptedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/avif',
  ];
  return acceptedTypes.includes(mimeType);
}

/**
 * Verifica se imagem está em formato WebP
 *
 * @param mimeType - MIME type da imagem
 * @returns True se for WebP
 *
 * @example
 * ```ts
 * isWebP('image/webp') // true
 * isWebP('image/jpeg') // false
 * ```
 */
export function isWebP(mimeType: string): boolean {
  return mimeType === 'image/webp';
}

/**
 * Verifica se navegador suporta WebP
 *
 * @returns Promise que resolve para true se suportar
 *
 * @example
 * ```ts
 * const supported = await supportsWebP();
 * if (supported) {
 *   // Usar WebP
 * }
 * ```
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Obtém informações da imagem
 *
 * @param file - Arquivo de imagem
 * @returns Promise com informações da imagem
 *
 * @example
 * ```ts
 * const info = await getImageInfo(file);
 * console.log(info.width, info.height, info.size);
 * ```
 */
export async function getImageInfo(file: File): Promise<{
  width: number;
  height: number;
  size: number;
  type: string;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Redimensiona imagem para dimensões máximas
 *
 * @param file - Arquivo de imagem original
 * @param maxWidth - Largura máxima
 * @param maxHeight - Altura máxima
 * @param quality - Qualidade da compressão (0-1)
 * @param format - Formato de saída
 * @returns Promise com arquivo redimensionado
 *
 * @example
 * ```ts
 * const resized = await resizeImage(file, 1920, 1080, 0.8, 'image/jpeg');
 * ```
 */
export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality = 0.9,
  format: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg'
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // Calcular novas dimensões mantendo proporção
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Converter para blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: format,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        format,
        quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Converte imagem para WebP
 *
 * @param file - Arquivo de imagem original
 * @param quality - Qualidade da conversão (0-1)
 * @returns Promise com arquivo em WebP
 *
 * @example
 * ```ts
 * const webpFile = await convertToWebP(file, 0.8);
 * ```
 */
export async function convertToWebP(
  file: File,
  quality = 0.9
): Promise<File> {
  // Se já for WebP, retornar original
  if (isWebP(file.type)) {
    return file;
  }
  
  return resizeImage(file, file.size, file.size, quality, 'image/webp');
}

/**
 * Prepara imagem para upload (otimiza e valida)
 *
 * @param file - Arquivo de imagem original
 * @param options - Opções de otimização
 * @returns Promise com imagem otimizada
 *
 * @example
 * ```ts
 * const optimized = await prepareImageForUpload(file, {
 *   maxWidth: 1920,
 *   maxHeight: 1080,
 *   quality: 0.8,
 *   convertToWebP: true
 * });
 * ```
 */
export async function prepareImageForUpload(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    shouldConvertToWebP?: boolean;
    maxSizeBytes?: number;
  } = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.9,
    shouldConvertToWebP = true,
    maxSizeBytes = 5 * 1024 * 1024, // 5MB
  } = options;
  
  // Validar formato
  if (!isAcceptedFormat(file.type)) {
    throw new Error('Formato de imagem não suportado');
  }
  
  // Validar tamanho
  if (file.size > maxSizeBytes) {
    throw new Error(`Arquivo muito grande. Máximo: ${maxSizeBytes / 1024 / 1024}MB`);
  }
  
  // Obter informações da imagem
  const info = await getImageInfo(file);
  
  // Redimensionar se necessário
  let processedFile = file;
  
  if (info.width > maxWidth || info.height > maxHeight) {
    processedFile = await resizeImage(file, maxWidth, maxHeight, quality);
  }
  
  // Converter para WebP se solicitado e suportado
  if (shouldConvertToWebP && !isWebP(processedFile.type)) {
    try {
      const isWebPSupported = await supportsWebP();
      if (isWebPSupported === true) {
        processedFile = await convertToWebP(processedFile, quality);
      }
    } catch {
      // Se WebP falhar, continuar com formato original
    }
  }
  
  return processedFile;
}

/**
 * Gera URL de placeholder para imagem
 *
 * @param width - Largura do placeholder
 * @param height - Altura do placeholder
 * @param text - Texto opcional para exibir
 * @returns URL do placeholder
 *
 * @example
 * ```ts
 * const placeholder = generatePlaceholder(300, 200, 'Sample');
 * ```
 */
export function generatePlaceholder(
  width: number,
  height: number,
  text = ''
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Fundo cinza usando tokens
  ctx.fillStyle = 'rgb(229, 231, 235)'; // neutral-200
  ctx.fillRect(0, 0, width, height);
  
  // Texto opcional
  if (text) {
    ctx.fillStyle = 'rgb(107, 114, 128)'; // neutral-500
    ctx.font = `${Math.min(width, height) / 10}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL();
}
