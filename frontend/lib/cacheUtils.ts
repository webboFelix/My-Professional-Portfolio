/**
 * Cache utility for managing data persistence and expiry
 * Default cache duration: 5 minutes
 */

const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Get cached data from localStorage with expiry check
 * @param key - Cache key
 * @param expiryMs - Cache expiry time in milliseconds (default: 5 minutes)
 * @returns Cached data or null if expired/not found
 */
export function getFromCache<T>(
  key: string,
  expiryMs: number = CACHE_EXPIRY_MS,
): T | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached) as CacheData<T>;
    const isExpired = Date.now() - timestamp > expiryMs;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error reading cache for key "${key}":`, error);
    return null;
  }
}

/**
 * Save data to localStorage cache
 * @param key - Cache key
 * @param data - Data to cache
 */
export function saveToCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;

  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error(`Error saving cache for key "${key}":`, error);
  }
}

/**
 * Clear a specific cache entry
 */
export function clearCache(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing cache for key "${key}":`, error);
  }
}

/**
 * Clear all portfolio cache
 */
export function clearAllCache(): void {
  if (typeof window === "undefined") return;

  const keys = [
    "portfolio_cache_posts",
    "portfolio_cache_labs",
    "portfolio_cache_projects",
    "portfolio_cache_videos",
  ];

  keys.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing cache for key "${key}":`, error);
    }
  });
}

/**
 * Check if cache is expired
 */
export function isCacheExpired(
  key: string,
  expiryMs: number = CACHE_EXPIRY_MS,
): boolean {
  if (typeof window === "undefined") return true;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return true;

    const { timestamp } = JSON.parse(cached) as CacheData<unknown>;
    return Date.now() - timestamp > expiryMs;
  } catch {
    return true;
  }
}

/**
 * Get cache timestamp
 */
export function getCacheTimestamp(key: string): number | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { timestamp } = JSON.parse(cached) as CacheData<unknown>;
    return timestamp;
  } catch {
    return null;
  }
}
