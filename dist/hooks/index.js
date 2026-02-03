'use strict';

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "admin";
  UserRole2["MODERATOR"] = "moderator";
  UserRole2["USER"] = "user";
  UserRole2["GUEST"] = "guest";
  return UserRole2;
})(UserRole || {});
var DEFAULT_CONFIG = {
  autoRefresh: true,
  refreshInterval: 15 * 60 * 1e3,
  // 15 minutes
  tokenStorageKey: "auth_token",
  userStorageKey: "auth_user",
  apiEndpoint: "/api/auth",
  onAuthChange: () => {
  },
  onError: () => {
  }
};
var AuthStorage = class {
  static setItem(key, value) {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }
  static getItem(key) {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Failed to read from localStorage:", error);
      return null;
    }
  }
  static removeItem(key) {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  }
  static setUser(user, key) {
    this.setItem(key, JSON.stringify(user));
  }
  static getUser(key) {
    const data = this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      this.removeItem(key);
      return null;
    }
  }
  static removeUser(key) {
    this.removeItem(key);
  }
};
__publicField(AuthStorage, "isClient", typeof window !== "undefined");
var TokenManager = class {
  static decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
  static isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    const now = Date.now() / 1e3;
    return (decoded.exp ?? 0) < now;
  }
};
function useAuth(config = {}) {
  const configRef = React.useRef({ ...DEFAULT_CONFIG, ...config });
  const cfg = configRef.current;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const refreshTimerRef = React.useRef(null);
  const storeToken = React.useCallback((token, refreshToken2) => {
    AuthStorage.setItem(cfg.tokenStorageKey, token);
    if (refreshToken2) {
      AuthStorage.setItem(`${cfg.tokenStorageKey}_refresh`, refreshToken2);
    }
  }, [cfg.tokenStorageKey]);
  const getStoredToken = React.useCallback(() => {
    return AuthStorage.getItem(cfg.tokenStorageKey);
  }, [cfg.tokenStorageKey]);
  const clearTokens = React.useCallback(() => {
    AuthStorage.removeItem(cfg.tokenStorageKey);
    AuthStorage.removeItem(`${cfg.tokenStorageKey}_refresh`);
  }, [cfg.tokenStorageKey]);
  const apiCall = React.useCallback(async (endpoint, options = {}) => {
    const token = getStoredToken();
    const url = `${cfg.apiEndpoint}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...token && { Authorization: `Bearer ${token}` },
        ...options.headers
      }
    });
    if (!response.ok) {
      const error2 = await response.text();
      throw new Error(error2 || `HTTP ${response.status}`);
    }
    return response.json();
  }, [cfg.apiEndpoint, getStoredToken]);
  const login = React.useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Login failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Login failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const logout = React.useCallback(async (options = {}) => {
    try {
      if (options.invalidateAllSessions) {
        await apiCall("/logout", { method: "POST" });
      }
    } catch (error2) {
      console.warn("Logout API call failed:", error2);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      clearTokens();
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      if (cfg.onAuthChange) {
        cfg.onAuthChange(null);
      }
    }
  }, [apiCall, clearTokens, cfg]);
  const register = React.useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/register", {
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Registration failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Registration failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const updateProfile = React.useCallback(async (data) => {
    if (!user) {
      const error2 = "No user logged in";
      setError(error2);
      if (cfg.onError) cfg.onError(error2);
      return { success: false, error: error2 };
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/profile", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      if (response.success && response.user) {
        setUser(response.user);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user };
      } else {
        const errorMsg = response.error || "Profile update failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Profile update failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, user, setUser, cfg]);
  const refreshToken = React.useCallback(async () => {
    const refreshToken2 = AuthStorage.getItem(`${cfg.tokenStorageKey}_refresh`);
    if (!refreshToken2) {
      return { success: false, error: "No refresh token available" };
    }
    try {
      const response = await apiCall("/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshToken2 })
      });
      if (response.success && response.token && response.user) {
        setUser(response.user);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        await logout();
        return { success: false, error: "Session expired" };
      }
    } catch (error2) {
      await logout();
      return { success: false, error: "Session expired" };
    }
  }, [apiCall, setUser, storeToken, logout, cfg]);
  const resetError = React.useCallback(() => {
    setError(null);
  }, []);
  React.useEffect(() => {
    const token = getStoredToken();
    const storedUser = AuthStorage.getUser(cfg.userStorageKey);
    if (token && storedUser && !TokenManager.isTokenExpired(token)) {
      setUser(storedUser);
      setIsAuthenticated(true);
      if (cfg.onAuthChange) {
        cfg.onAuthChange(storedUser);
      }
    } else if (token && TokenManager.isTokenExpired(token)) {
      refreshToken();
    } else {
      setLoading(false);
    }
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);
  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    refreshToken,
    resetError
  };
}
function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
function useCurrentUser() {
  const { user } = useAuth();
  return user;
}
function useHasRole(role) {
  const { user } = useAuth();
  return user?.role === role;
}
function useIsAdmin() {
  return useHasRole("admin" /* ADMIN */);
}
function usePasswordStrength(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    customPatterns = [],
    labels = {}
  } = options;
  const defaultLabels = {
    veryWeak: "Very Weak",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    enterPassword: "Enter a password",
    useMinLength: `Use at least ${minLength} characters`,
    addUppercase: "Add uppercase letters",
    addLowercase: "Add lowercase letters",
    addNumbers: "Add numbers",
    addSpecialChars: "Add special characters (!@#$%)",
    avoidRepeating: "Avoid repeating characters",
    avoidCommon: "Avoid common passwords or obvious patterns"
  };
  const finalLabels = { ...defaultLabels, ...labels };
  const strength = React__namespace.default.useMemo(() => {
    if (!password) return 0;
    let score = 0;
    const length = password.length;
    if (length >= minLength) score += 25;
    if (length >= 12) score += 15;
    if (length >= 16) score += 10;
    if (/[a-z]/.test(password) && requireLowercase) score += 15;
    if (/[A-Z]/.test(password) && requireUppercase) score += 15;
    if (/[0-9]/.test(password) && requireNumbers) score += 15;
    if (/[^a-zA-Z0-9]/.test(password) && requireSpecialChars) score += 20;
    customPatterns.forEach((pattern) => {
      if (new RegExp(pattern).test(password)) {
        score += 5;
      }
    });
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) {
      score += 10;
    }
    const commonPatterns = [
      /^123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /abc123/i,
      /^(.)\1+$/,
      // Caracteres repetidos
      /^(?:[a-z]+|[A-Z]+|[0-9]+)$/
      // Apenas um tipo de caractere
    ];
    commonPatterns.forEach((pattern) => {
      if (pattern.test(password)) {
        score = Math.max(0, score - 20);
      }
    });
    return Math.min(100, Math.max(0, score));
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars, customPatterns]);
  const level = React__namespace.default.useMemo(() => {
    if (strength < 20) return "very-weak";
    if (strength < 40) return "weak";
    if (strength < 60) return "fair";
    if (strength < 80) return "good";
    return "strong";
  }, [strength]);
  const color = React__namespace.default.useMemo(() => {
    switch (level) {
      case "very-weak":
        return "var(--color-red-500)";
      // red-500
      case "weak":
        return "#f97316";
      // orange-500
      case "fair":
        return "#eab308";
      // yellow-500
      case "good":
        return "var(--color-green-500)";
      // green-500
      case "strong":
        return "#059669";
      // emerald-600
      default:
        return "var(--color-gray-500)";
    }
  }, [level]);
  const label = React__namespace.default.useMemo(() => {
    switch (level) {
      case "very-weak":
        return finalLabels.veryWeak;
      case "weak":
        return finalLabels.weak;
      case "fair":
        return finalLabels.fair;
      case "good":
        return finalLabels.good;
      case "strong":
        return finalLabels.strong;
      default:
        return finalLabels.enterPassword;
    }
  }, [level, finalLabels]);
  const validations = React__namespace.default.useMemo(() => {
    return {
      hasMinLength: password.length >= minLength,
      hasUppercase: !requireUppercase || /[A-Z]/.test(password),
      hasLowercase: !requireLowercase || /[a-z]/.test(password),
      hasNumbers: !requireNumbers || /[0-9]/.test(password),
      hasSpecialChars: !requireSpecialChars || /[^a-zA-Z0-9]/.test(password),
      noRepeatingChars: !/^(.)\1+$/.test(password),
      noCommonPatterns: !/123456|password|qwerty|admin|abc123/i.test(password)
    };
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const isValid = React__namespace.default.useMemo(() => {
    return Object.values(validations).every(Boolean);
  }, [validations]);
  const suggestions = React__namespace.default.useMemo(() => {
    const suggestions2 = [];
    if (!validations.hasMinLength) {
      suggestions2.push(finalLabels.useMinLength);
    }
    if (!validations.hasUppercase && requireUppercase) {
      suggestions2.push(finalLabels.addUppercase);
    }
    if (!validations.hasLowercase && requireLowercase) {
      suggestions2.push(finalLabels.addLowercase);
    }
    if (!validations.hasNumbers && requireNumbers) {
      suggestions2.push(finalLabels.addNumbers);
    }
    if (!validations.hasSpecialChars && requireSpecialChars) {
      suggestions2.push(finalLabels.addSpecialChars);
    }
    if (!validations.noRepeatingChars) {
      suggestions2.push(finalLabels.avoidRepeating);
    }
    if (!validations.noCommonPatterns) {
      suggestions2.push(finalLabels.avoidCommon);
    }
    return suggestions2;
  }, [validations, finalLabels, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const generateStrongPassword = React__namespace.default.useCallback((length = 16) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let chars = lowercase;
    if (requireUppercase) chars += uppercase;
    if (requireNumbers) chars += numbers;
    if (requireSpecialChars) chars += special;
    let password2 = "";
    if (requireLowercase) password2 += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (requireUppercase) password2 += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (requireNumbers) password2 += numbers[Math.floor(Math.random() * numbers.length)];
    if (requireSpecialChars) password2 += special[Math.floor(Math.random() * special.length)];
    for (let i = password2.length; i < length; i++) {
      password2 += chars[Math.floor(Math.random() * chars.length)];
    }
    return password2.split("").sort(() => Math.random() - 0.5).join("");
  }, [requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  return {
    // Métricas principais
    strength,
    level,
    color,
    label,
    isValid,
    // Validações detalhadas
    validations,
    // Feedback ao usuário
    suggestions,
    // Utilitários
    generateStrongPassword,
    // Estados convenientes
    isVeryWeak: level === "very-weak",
    isWeak: level === "weak",
    isFair: level === "fair",
    isGood: level === "good",
    isStrong: level === "strong"
  };
}
function useIntersectionObserver(options = {}) {
  const {
    threshold = 0,
    rootMargin = "0px",
    root = null,
    freezeOnceVisible = false
  } = options;
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [entry, setEntry] = React.useState();
  const targetRef = React.useRef(null);
  React.useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    const hasSupport = "IntersectionObserver" in window;
    if (!hasSupport) return;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        const isElementIntersecting = entry2.isIntersecting;
        setEntry(entry2);
        setIsIntersecting(isElementIntersecting);
        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [
    threshold,
    rootMargin,
    root,
    freezeOnceVisible,
    targetRef.current
  ]);
  return {
    isIntersecting,
    targetRef,
    entry
  };
}

// src/scroll/index.ts
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function smoothScrollTo(target, options) {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) {
    console.warn(`Elemento n\xE3o encontrado: ${target}`);
    return;
  }
  const shouldAnimate = !prefersReducedMotion();
  element.scrollIntoView({
    behavior: shouldAnimate ? "smooth" : "auto",
    block: "start",
    inline: "nearest",
    ...options
  });
}
function scrollToTop() {
  const shouldAnimate = !prefersReducedMotion();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: shouldAnimate ? "smooth" : "auto"
  });
}
function scrollToPosition(x, y, smooth = true) {
  const shouldAnimate = smooth && !prefersReducedMotion();
  window.scrollTo({
    top: y,
    left: x,
    behavior: shouldAnimate ? "smooth" : "auto"
  });
}
function onReducedMotionChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (event) => {
    callback(event.matches);
  };
  handler(mediaQuery);
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }
  if (mediaQuery.addListener) {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }
  return () => {
  };
}

// src/hooks/use-smooth-scroll.ts
function useSmoothScroll() {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  React.useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    const cleanup = onReducedMotionChange((matches) => {
      setReducedMotion(matches);
    });
    return cleanup;
  }, []);
  const scrollTo = React.useCallback(
    (target, options) => {
      smoothScrollTo(target, options);
    },
    []
  );
  const toTop = React.useCallback(() => {
    scrollToTop();
  }, []);
  const toPosition = React.useCallback((x, y) => {
    scrollToPosition(x, y);
  }, []);
  return {
    scrollTo,
    scrollToTop: toTop,
    scrollToPosition: toPosition,
    reducedMotion,
    shouldAnimate: !reducedMotion
  };
}
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = React.useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(null);
  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      setScrollPosition({ x: currentScrollX, y: currentScrollY });
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return {
    scrollPosition,
    isScrolling,
    scrollDirection,
    isScrolledDown: scrollPosition.y > 0,
    scrollPercentage: Math.round(
      scrollPosition.y / (document.documentElement.scrollHeight - window.innerHeight) * 100
    )
  };
}

// src/dom/index.ts
function isMobile() {
  if (typeof window === "undefined") return false;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isMobileScreen = window.innerWidth <= 768;
  return isMobileUA || isMobileScreen;
}

// src/hooks/use-mobile.ts
function useIsMobile() {
  const [isMobileState, setIsMobileState] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    setIsMobileState(isMobile());
  }, []);
  return isMobileState;
}
function useToggleState({
  initialValue = false,
  storage = { type: "localStorage" },
  onToggle
} = {}) {
  const [isActive, setIsActive] = React.useState(initialValue);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (storage.type === "none") {
      setIsLoading(false);
      return;
    }
    try {
      const storageKey = storage.key || "toggle-state";
      const storageObj = storage.type === "localStorage" ? localStorage : sessionStorage;
      const stored = storageObj.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        if (storage.ttl && data.timestamp) {
          const age = (Date.now() - data.timestamp) / (1e3 * 60);
          if (age > storage.ttl) {
            storageObj.removeItem(storageKey);
            setIsLoading(false);
            return;
          }
        }
        setIsActive(data.value);
      }
    } catch (error) {
      console.warn("Error loading toggle state:", error);
    } finally {
      setIsLoading(false);
    }
  }, [storage]);
  const saveState = (newValue) => {
    setIsActive(newValue);
    onToggle?.(newValue);
    if (storage.type === "none") return;
    try {
      const storageKey = storage.key || "toggle-state";
      const storageObj = storage.type === "localStorage" ? localStorage : sessionStorage;
      const data = {
        value: newValue,
        timestamp: storage.ttl ? Date.now() : void 0
      };
      storageObj.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Error saving toggle state:", error);
    }
  };
  const toggle = () => saveState(!isActive);
  const setActive = (value) => saveState(value);
  return {
    isActive,
    isLoading,
    toggle,
    setActive,
    setIsActive: saveState
  };
}
function useCounter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange
} = {}) {
  const [count, setCount] = React.useState(initialValue);
  const increment = React.useCallback(() => {
    setCount((prev) => {
      const newValue = Math.min(prev + step, max);
      if (newValue !== prev) {
        onChange?.(newValue, step);
      }
      return newValue;
    });
  }, [step, max, onChange]);
  const decrement = React.useCallback(() => {
    setCount((prev) => {
      const newValue = Math.max(prev - step, min);
      if (newValue !== prev) {
        onChange?.(newValue, -step);
      }
      return newValue;
    });
  }, [step, min, onChange]);
  const set = React.useCallback((value) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setCount(clampedValue);
    if (clampedValue !== count) {
      onChange?.(clampedValue, clampedValue - count);
    }
  }, [min, max, count, onChange]);
  const reset = React.useCallback(() => {
    setCount(initialValue);
    if (initialValue !== count) {
      onChange?.(initialValue, initialValue - count);
    }
  }, [initialValue, count, onChange]);
  return {
    count,
    increment,
    decrement,
    set,
    reset,
    canIncrement: count < max,
    canDecrement: count > min,
    isAtMin: count === min,
    isAtMax: count === max
  };
}

exports.UserRole = UserRole;
exports.useAuth = useAuth;
exports.useCounter = useCounter;
exports.useCurrentUser = useCurrentUser;
exports.useHasRole = useHasRole;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useIsAdmin = useIsAdmin;
exports.useIsAuthenticated = useIsAuthenticated;
exports.useIsMobile = useIsMobile;
exports.usePasswordStrength = usePasswordStrength;
exports.useScrollPosition = useScrollPosition;
exports.useSmoothScroll = useSmoothScroll;
exports.useToggleState = useToggleState;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map