import { Config } from './interfaces';

/**
 * Default value for `cacheLifetime`.
 */
export const DEFAULT_CACHE_LIFETIME = 60 * 60 * 1000; // one hour

/**
 * Current configuration.
 */
let config: Config = {
  cacheLifetime: DEFAULT_CACHE_LIFETIME,
};

/**
 * Set config properties.
 *
 * @param config Object of properties to set.
 */
export function setConfig(overrides: Config) {
  return Object.assign(config, overrides);
}

/**
 * Get current configuration.
 */
export function getConfig() {
  return config;
}

/**
 * Reset configuration to defaults.
 */
export function resetConfig() {
  config = {
    cacheLifetime: DEFAULT_CACHE_LIFETIME,
  };
}
