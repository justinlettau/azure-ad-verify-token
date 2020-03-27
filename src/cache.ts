import { getConfig } from './config';
import { CacheItem } from './interfaces';

/**
 * Public key cache.
 */
const cache = new Map<string, CacheItem>();

/**
 * Get expiry.
 */
function getExpiry() {
  const now = new Date().getTime();
  const config = getConfig();

  return now + config.cacheLifetime;
}

/**
 * Set cache item.
 *
 * @param key Cache item key.
 * @param value Cache item value.
 */
export function setItem(key: string, value: string) {
  return cache.set(key, {
    result: Promise.resolve(value),
    expiry: getExpiry()
  });
}

/**
 * Set deferred cache item.
 *
 * @param key Cache item key.
 */
export function setDeferredItem(key: string) {
  let done: (value: string) => void;
  const result = new Promise<string>(resolve => {
    done = resolve;
  });

  return cache.set(key, {
    result,
    done,
    expiry: getExpiry()
  });
}

/**
 * Get cache item.
 *
 * @param key Cache item key.
 */
export function getItem(key: string) {
  const value = cache.get(key);
  const now = new Date().getTime();

  if (!value) {
    return null;
  }

  if (value.expiry < now) {
    // expired
    cache.delete(key);
    return null;
  }

  return value;
}

/**
 * Remove cache item.
 *
 * @param key Cache item key.
 */
export function removeItem(key: string) {
  return cache.delete(key);
}

/**
 * Clear all items.
 */
export function clear() {
  cache.clear();
}
