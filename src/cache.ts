import { getConfig } from './config';
import { CacheItem } from './interfaces';

/**
 * Public key cache.
 */
const cache = new Map<string, CacheItem>();

/**
 * Set cache item.
 *
 * @param key Cache item key.
 * @param value Public key value.
 */
export function setItem(key: string, value: string) {
  return cache.set(key, {
    value,
    expiry: new Date().getTime() + getConfig().cacheLifetime
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
