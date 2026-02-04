// src/dom/index.ts
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function onReducedMotionChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
function scrollToPosition(x = 0, y = 0, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, behavior } = options;
  window.scrollTo({
    left: x,
    top: y,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function scrollToTop(smooth = false) {
  scrollToPosition(0, 0, { smooth });
}
function smoothScrollTo(x, y, duration = 300) {
  if (typeof window === "undefined") return;
  const startX = window.scrollX;
  const startY = window.scrollY;
  const distanceX = x - startX;
  const distanceY = y - startY;
  const startTime = performance.now();
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentX = startX + distanceX * easeProgress;
    const currentY = startY + distanceY * easeProgress;
    window.scrollTo(currentX, currentY);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
function scrollToElement(element, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, offset = 0, behavior } = options;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return;
  const rect = targetElement.getBoundingClientRect();
  const absoluteY = rect.top + window.scrollY - offset;
  window.scrollTo({
    left: 0,
    top: absoluteY,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function isElementVisible(element, threshold = 0) {
  if (typeof window === "undefined") return false;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return false;
  const rect = targetElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;
  const isVisibleVertically = rect.bottom >= verticalThreshold && rect.top <= windowHeight - verticalThreshold;
  const isVisibleHorizontally = rect.right >= horizontalThreshold && rect.left <= windowWidth - horizontalThreshold;
  return isVisibleVertically && isVisibleHorizontally;
}
function getElementPosition(element) {
  if (typeof window === "undefined") return null;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return null;
  const rect = targetElement.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };
}
function isMobile() {
  if (typeof window === "undefined") return false;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isMobileScreen = window.innerWidth <= 768;
  return isMobileUA || isMobileScreen;
}
function isDarkMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function onDarkModeChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
async function copyToClipboard(text) {
  if (typeof window === "undefined") return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textArea);
    return result;
  } catch {
    return false;
  }
}
function downloadFile(blob, filename) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export { copyToClipboard, downloadFile, getElementPosition, isDarkMode, isElementVisible, isMobile, onDarkModeChange, onReducedMotionChange, prefersReducedMotion, scrollToElement, scrollToPosition, scrollToTop, smoothScrollTo };
//# sourceMappingURL=dom.mjs.map
//# sourceMappingURL=dom.mjs.map