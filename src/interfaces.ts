/**
 * Configuration options.
 */
export interface Config {

  /**
   * Number of milliseconds to cache public keys. Default: 1 hour
   */
  cacheLifetime?: number;
}

/**
 * Verify options.
 */
export interface VerifyOptions {

  /**
   * `jwk_uri` value obtained from B2C policy metadata endpoint.
   */
  jwksUri: string;

  /**
   * `issuer` value obtained from B2C policy metadata endpoint.
   */
  issuer: string;

  /**
   * Application ID of the application accessing the tenant.
   */
  audience: string;
}

/**
 * Public key cache item.
 */
export interface CacheItem {

  /**
   * RSA public key.
   */
  value: string;

  /**
   * Date, in milliseconds, the cache will be considered expired.
   */
  expiry: number;
}

/**
 * Azure json web key set.
 */
export interface AzureJwks {
  keys: AzureJwk[];
}

/**
 * Azure json web key.
 */
export interface AzureJwk {
  kid: string;
  nbf: number;
  use: string;
  kty: string;
  e: string;
  n: string;
}
